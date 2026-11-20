/**
 * Site-wide settings and copy.
 * Most day-to-day edits (availability, links, reply time) happen here.
 */
export const site = {
  name: "Built by Dylan",
  owner: "Dylan",
  domain: "builtbydylan.dev",
  url: "https://builtbydylan.dev",
  title: "Built by Dylan: websites for small businesses & startups",
  description:
    "Dylan designs, builds and looks after fast, modern websites for local businesses and startups, so you can get back to running yours.",

  /** Shown in the hero terminal and the header status dot. */
  availability: "Booking new projects now",

  /** Promise shown next to the contact form. */
  replyTime: "within one business day",

  /** Short trust points under the hero buttons. */
  promises: ["Free intro call", "Fixed quote up front", "You own everything"],

  nav: [
    { label: "Services", href: "#services" },
    { label: "Work", href: "#work" },
    { label: "Process", href: "#process" },
    { label: "About", href: "#about" },
    { label: "FAQ", href: "#faq" },
  ],

  socials: [{ label: "GitHub", href: "https://github.com/builtbydylan-dev" }],
} as const;
