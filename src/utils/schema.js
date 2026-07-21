// src/utils/schema.js
import { businessInfo } from "../data/businessInfo.js";
import { servicesData } from "../data/services.js";

export function generateHvacSchema(siteUrl = "https://hvac-volos.gr") {
  return {
    "@context": "https://schema.org",
    "@graph": [
      // 1. Primary Local Business Entity
      {
        "@type": "HVACBusiness",
        "@id": `${siteUrl}/#organization`,
        name: businessInfo.name,
        legalName: businessInfo.legalName,
        description: businessInfo.tagline,
        url: siteUrl,
        telephone: businessInfo.phone,
        email: businessInfo.email,
        priceRange: "$$",
        image: `${siteUrl}/images/og-share.jpg`,
        logo: `${siteUrl}/favicon.svg`,
        address: {
          "@type": "PostalAddress",
          streetAddress: businessInfo.address.street,
          addressLocality: businessInfo.address.city,
          addressRegion: businessInfo.address.region,
          postalCode: businessInfo.address.postalCode,
          addressCountry: businessInfo.address.country,
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: businessInfo.geo.latitude,
          longitude: businessInfo.geo.longitude,
        },
        areaServed: businessInfo.serviceAreas.map((areaName) => ({
          "@type": "AdministrativeArea",
          name: areaName,
        })),
        openingHoursSpecification: [
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: [
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday",
              "Saturday",
            ],
            opens: "08:00",
            closes: "20:00",
          },
        ],
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "HVAC Services",
          itemListElement: servicesData.map((service, index) => ({
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: service.title,
              description: service.description,
            },
            position: index + 1,
          })),
        },
      },

      // 2. Breadcrumb Navigation Entity
      {
        "@type": "BreadcrumbList",
        "@id": `${siteUrl}/#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Αρχική",
            item: siteUrl,
          },
        ],
      },
    ],
  };
}
