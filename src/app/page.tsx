import { About } from "@/components/about";
import { BuildMoment } from "@/components/build/build-moment";
import { ArrowRight } from "@/components/ui";
import { Contact } from "@/components/contact";
import { Faq } from "@/components/faq";
import { Hero } from "@/components/hero";
import { Process } from "@/components/process";
import { Services } from "@/components/services";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { Testimonials } from "@/components/testimonials";
import { Work } from "@/components/work";
import { faq } from "@/content/faq";
import { services } from "@/content/services";
import { site } from "@/content/site";
import { siteUrl } from "@/lib/site-url";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfessionalService",
      "@id": `${siteUrl}/#business`,
      name: site.name,
      url: siteUrl,
      description: site.description,
      image: `${siteUrl}${site.photo}`,
      areaServed: [site.location, "United States"],
      founder: {
        "@type": "Person",
        name: site.owner,
        jobTitle: "Web developer",
        image: `${siteUrl}${site.photo}`,
        sameAs: site.socials.map((s) => s.href),
      },
      sameAs: site.socials.map((s) => s.href),
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Web development services",
        itemListElement: services.map((s) => ({
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: s.title, description: s.summary },
        })),
      },
    },
    {
      "@type": "FAQPage",
      mainEntity: faq.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ],
};

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main id="main">
        <Hero />
        <BuildMoment
          id="build-website"
          variant="laptop"
          eyebrow="How I build"
          title="Every site starts as blocks."
          screen="/work/mavon-beauty.jpg"
          fallback={{ src: "/work/mavon-beauty.jpg", alt: "The MAVON Beauty website" }}
        >
          <p>
            I put yours together piece by piece: design, words, speed and search, until it&apos;s ready
            for real customers.
          </p>
          <p className="text-[15px] text-faint">Shown: the MAVON Beauty website.</p>
        </BuildMoment>
        <Services />
        <Work />
        <BuildMoment
          id="build-mobile"
          variant="phone"
          eyebrow="Mobile first"
          title="Built for the phone in their pocket."
          screen="/work/roots-app.webp"
          fallback={{
            src: "/work/roots-app.webp",
            alt: "The Roots app showing a youth group's student list",
            className: "aspect-[640/1385] h-full",
          }}
        >
          <p>
            Most people will find you on a phone, so everything I build starts there and scales up,
            not the other way around.
          </p>
          <p className="text-[15px] text-faint">Shown: the Roots app I built for Ministry Roots.</p>
        </BuildMoment>
        <Testimonials />
        <Process />
        <About />
        <Faq />
        <BuildMoment id="build-card" variant="card" eyebrow="Digital business cards" title="Even your business card.">
          <p>
            A digital card with your details and links, plus an Apple Wallet pass, so new contacts can
            save you in one tap.
          </p>
          <p>
            <a
              href="#contact"
              className="font-semibold text-accent underline decoration-accent/30 underline-offset-4 transition-colors hover:decoration-accent"
            >
              Let&apos;s build yours <ArrowRight className="inline size-4" />
            </a>
          </p>
        </BuildMoment>
        <Contact />
      </main>
      <SiteFooter />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
    </>
  );
}
