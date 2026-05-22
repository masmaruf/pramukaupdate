type JsonLd = Record<string, unknown>;

const ORGANIZATION_NAME = "PramukaUpdate";
const DEFAULT_LOGO = "/og-default.svg";

export function absoluteUrl(pathOrUrl: string, site: URL | string) {
  return new URL(pathOrUrl, site).toString();
}

export function parseRupiah(price: string) {
  const amount = Number(price.replace(/[^\d]/g, ""));
  return Number.isFinite(amount) && amount > 0 ? amount : undefined;
}

export function breadcrumbSchema(items: Array<{ label: string; href: string }>): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      item: item.href,
    })),
  };
}

export function organizationSchema(site: URL | string): JsonLd {
  const url = absoluteUrl("/", site);
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${url}#organization`,
    name: ORGANIZATION_NAME,
    alternateName: "Pramuka Update",
    url,
    logo: absoluteUrl(DEFAULT_LOGO, site),
    sameAs: ["https://pramukaupdate.id"],
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "customer support",
        areaServed: "ID",
        availableLanguage: ["id"],
      },
    ],
  };
}

export function websiteSchema(site: URL | string): JsonLd {
  const url = absoluteUrl("/", site);
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${url}#website`,
    name: ORGANIZATION_NAME,
    url,
    publisher: {
      "@id": `${url}#organization`,
    },
    potentialAction: {
      "@type": "SearchAction",
      target: `${absoluteUrl("/artikel", site)}?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

export function personOrOrganizationAuthor(name: string, site: URL | string): JsonLd {
  const trimmed = name.trim();
  if (!trimmed || trimmed.toLowerCase().includes("redaksi")) {
    return {
      "@type": "Organization",
      "@id": `${absoluteUrl("/", site)}#organization`,
      name: ORGANIZATION_NAME,
      url: absoluteUrl("/redaksi", site),
    };
  }

  return {
    "@type": "Person",
    name: trimmed,
    url: absoluteUrl(`/redaksi?author=${encodeURIComponent(trimmed)}`, site),
  };
}

export function articleSchema({
  title,
  description,
  url,
  image,
  author,
  publishedAt,
  updatedAt,
  keywords,
  site,
}: {
  title: string;
  description: string;
  url: string;
  image: string;
  author: string;
  publishedAt: Date;
  updatedAt?: Date;
  keywords?: string[];
  site: URL | string;
}): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: title,
    description,
    image,
    datePublished: publishedAt.toISOString(),
    dateModified: (updatedAt ?? publishedAt).toISOString(),
    keywords: keywords?.join(", "),
    author: personOrOrganizationAuthor(author, site),
    publisher: {
      "@type": "Organization",
      "@id": `${absoluteUrl("/", site)}#organization`,
      name: ORGANIZATION_NAME,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
  };
}

export function productSchema({
  title,
  description,
  url,
  image,
  price,
  category,
  paymentUrl,
  site,
}: {
  title: string;
  description: string;
  url: string;
  image: string;
  price: string;
  category: string;
  paymentUrl?: string;
  site: URL | string;
}): JsonLd {
  const numericPrice = parseRupiah(price);

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: title,
    description,
    image,
    category,
    brand: {
      "@type": "Brand",
      name: ORGANIZATION_NAME,
    },
    manufacturer: {
      "@id": `${absoluteUrl("/", site)}#organization`,
    },
    offers: {
      "@type": "Offer",
      url: paymentUrl || url,
      priceCurrency: "IDR",
      ...(numericPrice ? { price: numericPrice } : {}),
      availability: "https://schema.org/InStock",
      itemCondition: "https://schema.org/NewCondition",
      seller: {
        "@id": `${absoluteUrl("/", site)}#organization`,
      },
    },
  };
}
