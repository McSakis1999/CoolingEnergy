import { areaGroups } from '../data/areas.js';
import { businessInfo } from '../data/businessInfo.js';
import { absoluteUrl } from './urls.js';
export function generateHvacSchema() {
 const places = [...new Set([
   ...businessInfo.serviceAreas,
   ...areaGroups.flatMap(group => group.places),
 ])];
 const contact = {
   ...(businessInfo.phone ? { telephone: businessInfo.phone } : {}),
   ...(businessInfo.email ? { email: businessInfo.email } : {}),
 };
 return {
   '@context': 'https://schema.org',
   // No public business premises: describe the organization and its service
   // coverage without inventing an address to qualify for LocalBusiness results.
   '@type': 'Organization',
   '@id': absoluteUrl('#organization'),
   name: businessInfo.name,
   legalName: businessInfo.ownerName,
   taxID: businessInfo.taxId,
   url: absoluteUrl(),
   logo: absoluteUrl('images/logo.png'),
   description: businessInfo.tagline,
   sameAs: businessInfo.socialLinks.filter(link => /^https:\/\//i.test(link.url)).map(link => link.url),
   areaServed: places.map(name => ({ '@type': 'Place', name: `${name}, Μαγνησία, Ελλάδα` })),
   ...contact,
   contactPoint: {
     '@type': 'ContactPoint',
     contactType: 'customer service',
     url: absoluteUrl('#contact'),
     ...contact,
     availableLanguage: ['el'],
     areaServed: businessInfo.serviceAreas,
     hoursAvailable: {
       '@type': 'OpeningHoursSpecification',
       dayOfWeek: businessInfo.contactHours.days.map(day => `https://schema.org/${day}`),
       opens: businessInfo.contactHours.opens,
       closes: businessInfo.contactHours.closes,
     },
   },
 };
}
