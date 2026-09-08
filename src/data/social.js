import { servicesData } from './services.js';

// Card copy is separate from SEO titles to keep it readable at small sizes.
export const socialCards = [
  { id: 'home', path: '', lines: ['Φροντίδα για', 'τις συσκευές.', 'Άνεση για το σπίτι.'], label: 'ΚΛΙΜΑΤΙΣΜΟΣ & ΟΙΚΙΑΚΕΣ ΣΥΣΚΕΥΕΣ', image: null },
  { id: 'faq', path: 'faq', lines: ['Οι ερωτήσεις σας.', 'Μια πρώτη', 'απάντηση.'], label: 'ΣΥΧΝΕΣ ΕΡΩΤΗΣΕΙΣ', image: null },
  { id: 'perioxes', path: 'perioxes', lines: ['Κοντά σας,', 'στον Βόλο', 'και το Πήλιο.'], label: 'ΠΕΡΙΟΧΕΣ ΕΞΥΠΗΡΕΤΗΣΗΣ', image: null },
  { id: 'giorgos-moutos', path: 'giorgos-moutos', lines: ['Γιώργος Μούτος.', 'Ο άνθρωπος πίσω', 'από τη φροντίδα.'], label: 'ΓΝΩΡΙΣΤΕ ΤΗΝ COOLINGENERGY', image: null },
  { id: 'omada', path: 'omada', lines: ['Οι άνθρωποι', 'της CoolingEnergy.'], label: 'Η ΟΜΑΔΑ ΜΑΣ', image: null },
  { id: 'erga', path: 'erga', lines: ['Κάθε εργασία', 'έχει την', 'ιστορία της.'], label: 'ΕΡΓΑΣΙΕΣ & ΠΑΡΟΥΣΙΑΣΕΙΣ', image: null },
  { id: 'privacy', path: 'privacy', lines: ['Το απόρρητό σας.', 'Οι επιλογές σας.'], label: 'ΑΠΟΡΡΗΤΟ & COOKIES', image: null },
  ...servicesData.map(service => ({
    id: service.slug,
    path: `ypiresies/${service.slug}`,
    title: service.title,
    label: 'ΤΕΧΝΙΚΗ ΦΡΟΝΤΙΔΑ ΣΥΣΚΕΥΩΝ',
    image: { ac: 'ac-repair', washer: 'washer-repair', fridge: 'fridge-repair', kitchen: 'oven-repair' }[service.group],
  })),
];

export function socialCardForPath(pathname, base = '/') {
  const prefix = base.replace(/\/$/, '');
  const relative = (prefix && (pathname === prefix || pathname.startsWith(prefix + '/')) ? pathname.slice(prefix.length) : pathname).replace(/^\/+|\/+$/g, '');
  return socialCards.find(card => card.path === relative) || socialCards[0];
}
