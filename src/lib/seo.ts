type JsonLd = Record<string, unknown>;

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

export function articleSchema({
  title,
  description,
  url,
  image,
  publishedAt,
}: {
  title: string;
  description: string;
  url: string;
  image: string;
  publishedAt: Date;
}): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    image,
    datePublished: publishedAt.toISOString(),
    dateModified: publishedAt.toISOString(),
    author: {
      "@type": "Organization",
      name: "Redaksi PramukaUpdate",
    },
    publisher: {
      "@type": "Organization",
      name: "PramukaUpdate",
      url,
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
}: {
  title: string;
  description: string;
  url: string;
  image: string;
  price: string;
  category: string;
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
      name: "PramukaUpdate",
    },
    offers: {
      "@type": "Offer",
      url,
      priceCurrency: "IDR",
      ...(numericPrice ? { price: numericPrice } : {}),
      availability: "https://schema.org/InStock",
    },
  };
}
