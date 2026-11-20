import { About } from "@/components/about";
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

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfessionalService",
      "@id": `${site.url}/#business`,
      name: site.name,
      url: site.url,
      description: site.description,
      image: `${site.url}${site.photo}`,
      areaServed: [site.location, "United States"],
      founder: {
        "@type": "Person",
        name: site.owner,
        jobTitle: "Web developer",
        image: `${site.url}${site.photo}`,
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
        <Services />
        <Work />
        <Testimonials />
        <Process />
        <About />
        <Faq />
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
