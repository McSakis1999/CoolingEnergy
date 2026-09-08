export const jobCategories = {
  ac: 'Κλιματιστικά',
  washer: 'Πλυντήρια ρούχων',
  fridge: 'Ψυγεία',
  kitchen: 'Κουζίνες & φούρνοι',
};

// Validate at build time so mistakes in the JSON cannot silently break the gallery.
export function validateJobs(jobs) {
  if (!Array.isArray(jobs)) throw new Error('jobs.json must contain an array.');
  const ids = new Set();
  for (const [index, job] of jobs.entries()) {
    const fail = message => { throw new Error(`jobs.json entry ${index + 1}: ${message}`); };
    if (!job || typeof job !== 'object') fail('expected a job object.');
    for (const key of ['id', 'title', 'description', 'category']) {
      if (typeof job[key] !== 'string' || !job[key].trim()) fail(`${key} is required.`);
    }
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(job.id) || ids.has(job.id)) fail('id must be unique, using lowercase letters, numbers and hyphens.');
    ids.add(job.id);
    if (job.demo !== undefined && typeof job.demo !== 'boolean') fail('demo must be true or false.');
    if (!Object.hasOwn(jobCategories, job.category)) fail('category must be ac, washer, fridge or kitchen.');
    for (const key of ['published', 'featured']) if (typeof job[key] !== 'boolean') fail(`${key} must be true or false.`);
    if (job.location !== undefined && typeof job.location !== 'string') fail('location must be text.');
    if (job.work !== undefined && (!Array.isArray(job.work) || job.work.some(item => typeof item !== 'string' || !item.trim()))) fail('work must be an array of nonempty text items.');
    if (!Array.isArray(job.images)) fail('images must be an array (use [] for no extra images).');
    for (const photo of [job.mainImage, ...job.images]) {
      if (!photo || typeof photo.src !== 'string' || !/^images\/[a-zA-Z0-9_./-]+\.(webp|png|jpe?g|avif)$/i.test(photo.src) || photo.src.split('/').includes('..')) fail('each image src must be a local images/... path relative to public.');
      if (typeof photo.alt !== 'string' || !photo.alt.trim()) fail('each image needs descriptive alt text.');
      if (photo.caption !== undefined && typeof photo.caption !== 'string') fail('image caption must be text.');
    }
  }
  return jobs;
}

// File order is editorial order: place the jobs you want shown first at the top.
export const publishedJobs = jobs => jobs.filter(job => job.published);
export const featuredJobsFor = (jobs, category, limit = 3) => publishedJobs(jobs)
  .filter(job => job.featured && job.category === category).slice(0, limit);
