'use client';

import { useEffect } from 'react';

interface StructuredDataProps {
  schema: Record<string, any>;
  isHidden?: boolean;
}

export default function StructuredData({ schema, isHidden = true }: StructuredDataProps) {
  useEffect(() => {
    // Add structured data to head
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.innerHTML = JSON.stringify(schema);
    if (isHidden) {
      script.style.display = 'none';
    }
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, [schema, isHidden]);

  return null;
}

// Schema builders
export const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'LoisirsPrivé',
  alternateName: 'Loisirs Privé',
  url: 'https://loisirsprive.fr',
  logo: 'https://loisirsprive.fr/logo.png',
  description: 'Enchères et ventes privées d\'expériences de luxe et séjours exclusifs',
  sameAs: [
    'https://twitter.com/loisirsprive',
    'https://instagram.com/loisirsprive',
    'https://facebook.com/loisirsprive',
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'Customer Support',
    email: 'support@loisirsprive.fr',
    availableLanguage: ['fr', 'en'],
  },
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'FR',
  },
};

export const breadcrumbSchema = (items: Array<{ name: string; url: string }>) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: item.url,
  })),
});

export const faqSchema = (
  faqs: Array<{
    question: string;
    answer: string;
  }>
) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer,
    },
  })),
});

export const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'LoisirsPrivé',
  image: 'https://loisirsprive.fr/logo.png',
  description: 'Plateforme d\'enchères et ventes privées for luxury experiences',
  address: {
    '@type': 'PostalAddress',
    addressCountry: 'FR',
  },
  url: 'https://loisirsprive.fr',
  telephone: '+33 1 XX XX XX XX',
  priceRange: '€€€',
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    opens: '09:00',
    closes: '17:00',
  },
};
