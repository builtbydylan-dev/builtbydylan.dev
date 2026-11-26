/**
 * Scroll-driven 3D "build" scenes: glowing blocks fly in, snap together into a
 * device (laptop, phone or business card), the device opens and its screen
 * lights up with real work, then it turns as you keep scrolling.
 *
 * Plain three.js (no React renderer) so the whole thing loads lazily as one chunk.
 * Everything is driven by a single progress value from 0 to 1.
 */
import {
  AmbientLight,
  BoxGeometry,
  CanvasTexture,
  Color,
  DirectionalLight,
  Group,
  InstancedMesh,
  MathUtils,
  Matrix4,
  Mesh,
  MeshBasicMaterial,
  MeshStandardMaterial,
  PerspectiveCamera,
  PlaneGeometry,
  PointLight,
  Quaternion,
  Euler,
  SRGBColorSpace,
  Scene,
  TextureLoader,
  Vector3,
  WebGLRenderer,
  type Material,
  type Texture,
  type BufferGeometry,
} from "three";

export type BuildVariant = "laptop" | "phone" | "card";

export type BuildSceneOptions = {
  /** Image shown on the device screen (laptop/phone). */
  screen?: string;
  reducedMotion: boolean;
  /** Resolved CSS font-family stacks, used to draw the business card. */
  fonts: { sans: string; mono: string };
};

export type BuildScene = {
  /** Scroll progress through the section, 0–1. `jump` skips the easing. */
  setTarget(t: number, jump?: boolean): void;
  /** Start or stop the render loop (only runs while on screen). */
  setActive(active: boolean): void;
  resize(width: number, height: number): void;
  dispose(): void;
};

const ACCENT = new Color("#5cf59a");
const SKY = new Color("#82c8ff");
const BLOCK = new Color("#2f3946");

const clamp01 = (x: number) => Math.min(1, Math.max(0, x));
const range = (t: number, a: number, b: number) => clamp01((t - a) / (b - a));
const easeOutCubic = (x: number) => 1 - Math.pow(1 - x, 3);
const easeInOut = (x: number) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);

/** Small seeded RNG so every visit builds the same way. */
function rng(seed: number) {
  return () => {
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

type SlabSpec = {
  cols: number;
  rows: number;
  cell: number;
  thickness: number;
  /** "xy" stands upright facing the camera, "xz" lies flat. */
  plane: "xy" | "xz";
  center: Vector3;
  seed: number;
};

const MAX_DELAY = 0.55;

/** Surface layers (screens, card faces) always win the depth test against the blocks beneath them. */
const ON_TOP = { polygonOffset: true, polygonOffsetFactor: -2, polygonOffsetUnits: -4 } as const;
const IDENTITY = new Quaternion();

/** A flat slab made of individual blocks that can fly in and assemble. */
class Slab {
  readonly body: InstancedMesh;
  readonly glow: InstancedMesh;
  private targets: Vector3[] = [];
  private starts: Vector3[] = [];
  private startRotations: Quaternion[] = [];
  private delays: number[] = [];
  private glowIndex: number[] = [];
  private glowMaterial: MeshBasicMaterial;
  private m = new Matrix4();
  private p = new Vector3();
  private q = new Quaternion();
  private s = new Vector3();

  constructor(spec: SlabSpec, bodyMaterial: Material, track: (g: BufferGeometry, m?: Material) => void) {
    const { cols, rows, cell, thickness, plane, center } = spec;
    const random = rng(spec.seed);
    const geometry =
      plane === "xy" ? new BoxGeometry(cell, cell, thickness) : new BoxGeometry(cell, thickness, cell);
    const count = cols * rows;

    this.body = new InstancedMesh(geometry, bodyMaterial, count);
    this.glowMaterial = new MeshBasicMaterial({ transparent: true, opacity: 1, toneMapped: false });
    track(geometry, this.glowMaterial);

    const glowColors: Color[] = [];
    for (let j = 0; j < rows; j++) {
      for (let i = 0; i < cols; i++) {
        const x = (i - (cols - 1) / 2) * cell + center.x;
        const target =
          plane === "xy"
            ? new Vector3(x, (j - (rows - 1) / 2) * cell + center.y, center.z)
            : new Vector3(x, center.y, (j - (rows - 1) / 2) * cell + center.z);
        this.targets.push(target);

        // Scatter each block somewhere around the device, biased up and out.
        const dir = new Vector3(random() * 2 - 1, random() * 1.6 - 0.4, random() * 1.4 - 0.4).normalize();
        this.starts.push(target.clone().addScaledVector(dir, 4 + random() * 7));
        this.startRotations.push(
          new Quaternion().setFromEuler(new Euler(random() * 6.28, random() * 6.28, random() * 6.28)),
        );

        // Build bottom-up (or back-to-front) with a little randomness.
        const order = j / Math.max(1, rows - 1);
        this.delays.push(MAX_DELAY * (0.65 * order + 0.35 * random()));

        this.body.setColorAt(this.targets.length - 1, BLOCK);
        const roll = random();
        if (roll < 0.16) {
          this.glowIndex.push(this.targets.length - 1);
          glowColors.push(roll < 0.035 ? SKY : ACCENT);
        }
      }
    }

    if (this.body.instanceColor) this.body.instanceColor.needsUpdate = true;

    this.glow = new InstancedMesh(geometry, this.glowMaterial, Math.max(1, this.glowIndex.length));
    this.glow.count = this.glowIndex.length;
    glowColors.forEach((c, k) => this.glow.setColorAt(k, c));
    if (this.glow.instanceColor) this.glow.instanceColor.needsUpdate = true;

    // Blocks travel far from the mesh origin, so skip bounds-based culling.
    this.body.frustumCulled = false;
    this.glow.frustumCulled = false;
  }

  /** assemble: blocks fly home · solid: gaps close and the glow fades. */
  update(assemble: number, solid: number) {
    const gap = MathUtils.lerp(0.8, 0.985, solid);
    let g = 0;
    for (let i = 0; i < this.targets.length; i++) {
      const local = easeOutCubic(clamp01((assemble - this.delays[i]) / (1 - MAX_DELAY)));
      this.p.lerpVectors(this.starts[i], this.targets[i], local);
      this.q.slerpQuaternions(this.startRotations[i], IDENTITY, local);
      const scale = (0.3 + 0.7 * local) * gap;
      this.s.setScalar(scale);
      this.m.compose(this.p, this.q, this.s);
      this.body.setMatrixAt(i, this.m);
      if (this.glowIndex[g] === i) {
        this.s.setScalar(scale * 1.015);
        this.m.compose(this.p, this.q, this.s);
        this.glow.setMatrixAt(g++, this.m);
      }
    }
    this.body.instanceMatrix.needsUpdate = true;
    this.glow.instanceMatrix.needsUpdate = true;
    this.glowMaterial.opacity = 1 - solid;
    this.glow.visible = solid < 1;
  }
}

/** A soft radial shadow texture to ground the device. */
function shadowTexture() {
  const c = document.createElement("canvas");
  c.width = c.height = 256;
  const ctx = c.getContext("2d")!;
  const grad = ctx.createRadialGradient(128, 128, 0, 128, 128, 128);
  grad.addColorStop(0, "rgba(0,0,0,0.75)");
  grad.addColorStop(0.6, "rgba(0,0,0,0.25)");
  grad.addColorStop(1, "rgba(0,0,0,0)");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 256, 256);
  return new CanvasTexture(c);
}

function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

function drawCardFront(fonts: BuildSceneOptions["fonts"]) {
  const W = 1020;
  const H = 600;
  const c = document.createElement("canvas");
  c.width = W;
  c.height = H;
  const ctx = c.getContext("2d")!;
  const bg = ctx.createLinearGradient(0, 0, W, H);
  bg.addColorStop(0, "#10141a");
  bg.addColorStop(1, "#0a0c10");
  ctx.fillStyle = bg;
  roundRect(ctx, 0, 0, W, H, 34);
  ctx.fill();
  const glow = ctx.createRadialGradient(W * 0.85, -40, 0, W * 0.85, -40, 520);
  glow.addColorStop(0, "rgba(92,245,154,0.28)");
  glow.addColorStop(1, "rgba(92,245,154,0)");
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, W, H);

  ctx.textBaseline = "alphabetic";
  ctx.font = `500 34px ${fonts.mono}`;
  ctx.fillStyle = "#5cf59a";
  ctx.fillText("❯", 64, 104);
  ctx.fillStyle = "#e8ebef";
  ctx.fillText("builtbydylan", 104, 104);
  const w1 = ctx.measureText("builtbydylan").width;
  ctx.fillStyle = "#747d8a";
  ctx.fillText(".dev", 104 + w1, 104);

  ctx.fillStyle = "#e8ebef";
  ctx.font = `600 86px ${fonts.sans}`;
  ctx.fillText("Dylan Hovanec", 60, 330);
  ctx.fillStyle = "#9ba4b1";
  ctx.font = `400 36px ${fonts.sans}`;
  ctx.fillText("Web developer · Northeast Ohio", 64, 392);

  ctx.strokeStyle = "#2a323d";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(64, 470);
  ctx.lineTo(W - 64, 470);
  ctx.stroke();

  ctx.font = `400 28px ${fonts.mono}`;
  ctx.fillStyle = "#82c8ff";
  ctx.fillText("websites · care plans · branding", 64, 534);
  ctx.fillStyle = "#5cf59a";
  const saved = "✓ saved to wallet";
  ctx.fillText(saved, W - 64 - ctx.measureText(saved).width, 534);
  return c;
}

function drawCardBack(fonts: BuildSceneOptions["fonts"]) {
  const W = 1020;
  const H = 600;
  const c = document.createElement("canvas");
  c.width = W;
  c.height = H;
  const ctx = c.getContext("2d")!;
  ctx.fillStyle = "#0c0f13";
  roundRect(ctx, 0, 0, W, H, 34);
  ctx.fill();
  ctx.strokeStyle = "rgba(255,255,255,0.05)";
  ctx.lineWidth = 2;
  for (let x = 0; x <= W; x += 60) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, H);
    ctx.stroke();
  }
  for (let y = 0; y <= H; y += 60) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(W, y);
    ctx.stroke();
  }
  ctx.font = `600 190px ${fonts.mono}`;
  ctx.fillStyle = "#5cf59a";
  const mark = "❯_";
  ctx.fillText(mark, (W - ctx.measureText(mark).width) / 2, 365);
  return c;
}

export function createBuildScene(
  canvas: HTMLCanvasElement,
  variant: BuildVariant,
  options: BuildSceneOptions,
): BuildScene | null {
  let renderer: WebGLRenderer;
  try {
    renderer = new WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: "high-performance" });
  } catch {
    return null;
  }
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.setClearColor(0x000000, 0);

  const disposables: { dispose(): void }[] = [];
  const track = (g?: { dispose(): void }, m?: { dispose(): void }) => {
    if (g) disposables.push(g);
    if (m) disposables.push(m);
  };

  const scene = new Scene();
  // A near plane of 1 (not 0.1) keeps depth precision high enough for the thin screen layers.
  const camera = new PerspectiveCamera(32, 1, 1, 60);

  scene.add(new AmbientLight(0xffffff, 0.7));
  const key = new DirectionalLight(0xffffff, 2.2);
  key.position.set(4, 7, 6);
  scene.add(key);
  const fill = new DirectionalLight(SKY, 0.5);
  fill.position.set(-6, -1, 4);
  scene.add(fill);
  const rim = new PointLight(ACCENT, 24, 18, 1.6);
  rim.position.set(-4, 0.8, -4.5);
  scene.add(rim);

  const bodyMaterial = new MeshStandardMaterial({ color: 0xffffff, roughness: 0.45, metalness: 0.35 });
  track(undefined, bodyMaterial);

  const root = new Group();
  scene.add(root);

  const shadowTex = shadowTexture();
  const shadowMat = new MeshBasicMaterial({ map: shadowTex, transparent: true, opacity: 0, depthWrite: false });
  const shadow = new Mesh(new PlaneGeometry(1, 1), shadowMat);
  shadow.rotation.x = -Math.PI / 2;
  track(shadow.geometry, shadowMat);
  track(shadowTex);
  scene.add(shadow);

  const slabs: Slab[] = [];
  const addSlab = (spec: SlabSpec, parent: Group) => {
    const slab = new Slab(spec, bodyMaterial, track);
    parent.add(slab.body, slab.glow);
    slabs.push(slab);
    return slab;
  };

  const screenMaterial = new MeshBasicMaterial({ transparent: true, opacity: 0, toneMapped: false, color: 0xffffff, ...ON_TOP });
  track(undefined, screenMaterial);
  const loadScreen = (url?: string) => {
    if (!url) return;
    new TextureLoader().load(url, (tex: Texture) => {
      tex.colorSpace = SRGBColorSpace;
      tex.anisotropy = renderer.capabilities.getMaxAnisotropy();
      screenMaterial.map = tex;
      screenMaterial.needsUpdate = true;
      track(tex);
      requestRender();
    });
  };

  /** Size of the area the camera should keep in view, and its vertical center. */
  let frame = { w: 5, h: 4, y: 0 };
  let apply: (t: number, time: number) => void = () => {};

  if (variant === "laptop") {
    // Base lies flat; the lid is hinged at the back edge and opens toward the camera.
    const cell = 0.25;
    addSlab({ cols: 16, rows: 11, cell, thickness: 0.14, plane: "xz", center: new Vector3(0, 0, 0), seed: 11 }, root);
    const deck = new Mesh(
      new PlaneGeometry(3.5, 1.25),
      new MeshStandardMaterial({ color: "#12161c", roughness: 0.8, transparent: true, opacity: 0, ...ON_TOP }),
    );
    deck.rotation.x = -Math.PI / 2;
    deck.position.set(0, 0.082, -0.3);
    const pad = new Mesh(
      new PlaneGeometry(1.2, 0.72),
      new MeshStandardMaterial({ color: "#1a2029", roughness: 0.6, transparent: true, opacity: 0, ...ON_TOP }),
    );
    pad.rotation.x = -Math.PI / 2;
    pad.position.set(0, 0.082, 0.85);
    track(deck.geometry, deck.material as Material);
    track(pad.geometry, pad.material as Material);
    root.add(deck, pad);

    const lid = new Group();
    lid.position.set(0, 0.125, -1.375);
    root.add(lid);
    addSlab({ cols: 16, rows: 10, cell, thickness: 0.1, plane: "xy", center: new Vector3(0, 1.25, 0), seed: 29 }, lid);
    const screen = new Mesh(new PlaneGeometry(3.76, 2.35), screenMaterial);
    screen.position.set(0, 1.27, 0.064);
    track(screen.geometry);
    lid.add(screen);
    loadScreen(options.screen);

    shadow.scale.set(6.5, 4.5, 1);
    shadow.position.set(0, -0.08, 0);
    frame = { w: 4.5, h: 3.4, y: 0.95 };

    apply = (t, time) => {
      const assemble = range(t, 0.02, 0.5);
      const solid = range(t, 0.44, 0.54);
      const open = easeInOut(range(t, 0.52, 0.74));
      slabs.forEach((s) => s.update(assemble, solid));
      (deck.material as MeshStandardMaterial).opacity = solid;
      (pad.material as MeshStandardMaterial).opacity = solid;
      lid.rotation.x = MathUtils.lerp(Math.PI / 2, -0.24, open);
      screenMaterial.opacity = range(open, 0.35, 1);
      root.rotation.y = MathUtils.lerp(-0.75, 0.38, easeInOut(t));
      root.rotation.x = 0.06;
      root.position.y = Math.sin(time * 0.9) * 0.04 * solid;
      shadowMat.opacity = 0.65 * solid;
    };
  } else if (variant === "phone") {
    const cell = 0.2;
    addSlab({ cols: 9, rows: 19, cell, thickness: 0.18, plane: "xy", center: new Vector3(0, 0, 0), seed: 47 }, root);
    const screen = new Mesh(new PlaneGeometry(1.66, 3.6), screenMaterial);
    screen.position.set(0, 0, 0.104);
    track(screen.geometry);
    root.add(screen);
    const lens = new Mesh(
      new BoxGeometry(0.42, 0.42, 0.06),
      new MeshStandardMaterial({ color: "#11151a", roughness: 0.3, metalness: 0.6, transparent: true, opacity: 0 }),
    );
    lens.position.set(-0.52, 1.42, -0.12);
    track(lens.geometry, lens.material as Material);
    root.add(lens);
    loadScreen(options.screen);

    shadow.scale.set(3.4, 1.6, 1);
    shadow.position.set(0, -2.45, 0);
    frame = { w: 3.1, h: 4.6, y: -0.15 };

    apply = (t, time) => {
      const assemble = range(t, 0.02, 0.5);
      const solid = range(t, 0.44, 0.54);
      const on = range(t, 0.54, 0.68);
      slabs.forEach((s) => s.update(assemble, solid));
      (lens.material as MeshStandardMaterial).opacity = solid;
      screenMaterial.opacity = on;
      root.rotation.y = MathUtils.lerp(-1.15, 0.42, easeInOut(t));
      root.rotation.z = MathUtils.lerp(0.18, -0.06, easeInOut(t));
      root.rotation.x = 0.05;
      root.position.y = Math.sin(time * 0.9) * 0.05 * solid;
      shadowMat.opacity = 0.55 * solid;
    };
  } else {
    // Business card: assembles showing its back, then flips to reveal the front.
    const cell = 0.2;
    addSlab({ cols: 17, rows: 10, cell, thickness: 0.06, plane: "xy", center: new Vector3(0, 0, 0), seed: 83 }, root);
    const frontTex = new CanvasTexture(drawCardFront(options.fonts));
    const backTex = new CanvasTexture(drawCardBack(options.fonts));
    for (const tex of [frontTex, backTex]) {
      tex.colorSpace = SRGBColorSpace;
      tex.anisotropy = renderer.capabilities.getMaxAnisotropy();
      track(tex);
    }
    const frontMat = new MeshBasicMaterial({ map: frontTex, transparent: true, opacity: 0, toneMapped: false, ...ON_TOP });
    const backMat = new MeshBasicMaterial({ map: backTex, transparent: true, opacity: 0, toneMapped: false, ...ON_TOP });
    const front = new Mesh(new PlaneGeometry(3.38, 1.99), frontMat);
    front.position.z = 0.044;
    const back = new Mesh(new PlaneGeometry(3.38, 1.99), backMat);
    back.position.z = -0.044;
    back.rotation.y = Math.PI;
    track(front.geometry, frontMat);
    track(back.geometry, backMat);
    root.add(front, back);

    // Redraw once web fonts are ready so the card uses Geist and JetBrains Mono.
    document.fonts?.ready.then(() => {
      if (disposed) return;
      frontTex.image = drawCardFront(options.fonts);
      backTex.image = drawCardBack(options.fonts);
      frontTex.needsUpdate = backTex.needsUpdate = true;
      requestRender();
    });

    shadow.scale.set(5, 1.8, 1);
    shadow.position.set(0, -1.75, 0);
    frame = { w: 3.9, h: 2.8, y: -0.1 };

    apply = (t, time) => {
      const assemble = range(t, 0.02, 0.5);
      const solid = range(t, 0.44, 0.54);
      const flip = easeInOut(range(t, 0.54, 0.76));
      slabs.forEach((s) => s.update(assemble, solid));
      backMat.opacity = solid;
      frontMat.opacity = solid;
      root.rotation.y = Math.PI * (1 - flip) + MathUtils.lerp(-0.5, 0.32, easeInOut(t));
      root.rotation.x = MathUtils.lerp(0.35, 0.12, easeInOut(t));
      root.position.y = Math.sin(time * 0.9) * 0.05 * solid;
      shadowMat.opacity = 0.5 * solid;
    };
  }

  // ---- loop ---------------------------------------------------------------

  const reduced = options.reducedMotion;
  let target = reduced ? 1 : 0;
  let current = target;
  let active = false;
  let raf = 0;
  let disposed = false;
  const start = performance.now();

  function render() {
    apply(current, reduced ? 0 : (performance.now() - start) / 1000);
    renderer.render(scene, camera);
  }

  function tick() {
    raf = 0;
    if (disposed) return;
    current += (target - current) * 0.12;
    if (Math.abs(target - current) < 0.0004) current = target;
    render();
    if (active && !reduced) raf = requestAnimationFrame(tick);
  }

  function requestRender() {
    if (!raf && !disposed) raf = requestAnimationFrame(tick);
  }

  return {
    setTarget(t, jump) {
      if (reduced) return;
      target = clamp01(t);
      if (jump) current = target;
      if (active) requestRender();
    },
    setActive(next) {
      active = next;
      if (next) requestRender();
    },
    resize(width, height) {
      if (width < 1 || height < 1) return;
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      const half = Math.tan(MathUtils.degToRad(camera.fov / 2));
      const dist = Math.max(frame.h / 2 / half, frame.w / 2 / (half * camera.aspect)) * (camera.aspect < 1 ? 1.12 : 1);
      camera.position.set(0, frame.y + dist * 0.16, dist);
      camera.lookAt(0, frame.y, 0);
      camera.updateProjectionMatrix();
      requestRender();
    },
    dispose() {
      disposed = true;
      if (raf) cancelAnimationFrame(raf);
      disposables.forEach((d) => d.dispose());
      renderer.dispose();
    },
  };
}
