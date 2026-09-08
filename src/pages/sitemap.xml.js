import { servicesData } from '../data/services.js';
import { absoluteUrl } from '../utils/urls.js';
export function GET() {
 const urls = [absoluteUrl(), absoluteUrl("privacy/"), absoluteUrl("faq/"), absoluteUrl("perioxes/"), ...["giorgos-moutos/", "omada/", "erga/"].map(absoluteUrl), ...servicesData.map(s=>absoluteUrl('ypiresies/'+s.slug+'/'))];
 return new Response('<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'+urls.map(url=>'<url><loc>'+url+'</loc></url>').join('')+'</urlset>',{headers:{'Content-Type':'application/xml'}});
}

