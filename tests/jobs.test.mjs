import { test } from 'node:test';
import assert from 'node:assert/strict';
import { validateJobs, featuredJobsFor, publishedJobs } from '../src/utils/jobs.js';

const job = (overrides = {}) => ({
  id: 'washer-one', title: 'Real job', description: 'Actual diagnosis and outcome.',
  category: 'washer', published: true, featured: true,
  mainImage: { src: 'images/work/main.webp', alt: 'The repaired appliance' }, images: [], ...overrides,
});
test('only published, featured jobs in the matching category appear', () => {
  const entries = [job(), job({ id: 'draft', published: false }), job({ id: 'archive', featured: false }), job({ id: 'fridge', category: 'fridge' })];
  assert.deepEqual(featuredJobsFor(entries, 'washer').map(j => j.id), ['washer-one']);
  assert.equal(publishedJobs(entries).length, 3);
  assert.deepEqual(featuredJobsFor(entries, 'ac'), []);
});
test('featured jobs follow editorial order and are limited to three', () => {
  const entries = ['four', 'two', 'three', 'one'].map(id => job({ id }));
  assert.deepEqual(featuredJobsFor(entries, 'washer').map(j => j.id), ['four', 'two', 'three']);
});
test('empty catalog and valid jobs with optional gallery data are accepted', () => {
  assert.deepEqual(validateJobs([]), []);
  assert.equal(validateJobs([job({ work: ['Completed check'], images: [{ src: 'images/work/detail.jpg', alt: 'Repair detail' }] })]).length, 1);
});
test('invalid categories, duplicate IDs, missing alt text and unsafe paths fail clearly', () => {
  assert.throws(() => validateJobs([job({ category: 'washing-machine' })]), /category/);
  assert.throws(() => validateJobs([job(), job()]), /unique/);
  assert.throws(() => validateJobs([job({ mainImage: { src: 'images/work/main.webp', alt: '' } })]), /alt/);
  assert.throws(() => validateJobs([job({ mainImage: { src: 'images/../private.webp', alt: 'Photo' } })]), /local/);
  assert.throws(() => validateJobs([job({ published: 'true' })]), /published/);
});
