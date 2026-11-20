/**
 * Site-wide settings and copy.
 * Most day-to-day edits (availability, links, reply time) happen here.
 */
export const site = {
  name: "Built by Dylan",
  owner: "Dylan Hovanec",
  domain: "builtbydylan.dev",
  url: "https://builtbydylan.dev",
  title: "Built by Dylan: websites for small businesses, churches & startups",
  description:
    "Dylan Hovanec designs, builds and looks after fast, modern websites for small businesses, churches and ministries, and startups, in Northeast Ohio and anywhere online.",

  /** Where you're based and who you serve. */
  location: "Northeast Ohio",
  serviceArea: "Northeast Ohio & remote",

  /** Headshot in /public, shown in the About section. */
  photo: "/dylan-hovanec.jpg",

  /** Shown in the hero badge and terminal. */
  availability: "Booking new projects now",

  /** Promise shown next to the contact form. */
  replyTime: "within one business day",

  /** Short trust points under the hero buttons. */
  promises: ["Free intro call", "Websites from $250", "Reply within 1 business day"],

  nav: [
    { label: "Services", href: "#services" },
    { label: "Work", href: "#work" },
    { label: "Process", href: "#process" },
    { label: "About", href: "#about" },
    { label: "FAQ", href: "#faq" },
  ],

  socials: [{ label: "Instagram", href: "https://www.instagram.com/dylanhovaneccc/" }],
} as const;
