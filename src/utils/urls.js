export const basePath = `${import.meta.env.BASE_URL.replace(/\/$/, '')}/`;
export const withBase = (path = '') => `${basePath}${path.replace(/^\/+/, '')}`;
export const absoluteUrl = (path = '') => new URL(withBase(path), import.meta.env.SITE).href;
export const serviceUrl = (slug) => withBase(`ypiresies/${slug}/`);
