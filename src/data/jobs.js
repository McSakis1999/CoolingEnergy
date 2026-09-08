import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
import rawJobs from './jobs.json';
import { validateJobs } from '../utils/jobs.js';

export const jobs = validateJobs(rawJobs);
for (const job of jobs.filter(job => job.published)) {
  for (const photo of [job.mainImage, ...job.images]) {
    if (!existsSync(resolve('public', photo.src))) {
      throw new Error(`jobs.json: image missing for "${job.id}": public/${photo.src}`);
    }
  }
}
