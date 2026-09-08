import { areaGroups } from '../data/areas.js';
import { businessInfo } from '../data/businessInfo.js';
import { absoluteUrl } from './urls.js';
export function generateHvacSchema() {
 return { '@context': 'https://schema.org', '@type': 'Organization', '@id': absoluteUrl('#organization'), name: businessInfo.name, url: absoluteUrl(), logo: absoluteUrl('images/logo.png'), description: businessInfo.tagline, areaServed: areaGroups.flatMap(group=>group.places.map(name=>({'@type':'Place',name:name+', Πήλιο / Μαγνησία'}))), ...(businessInfo.phone ? {telephone:businessInfo.phone}:{}), ...(businessInfo.email ? {email:businessInfo.email}:{}) };
}
