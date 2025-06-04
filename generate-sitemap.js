// generate-sitemap.mjs (or ensure package.json has "type": "module")
import { SitemapStream, streamToPromise } from 'sitemap';
import { createWriteStream } from 'fs';
import { resolve } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// These lines help resolve __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const baseUrl = 'https://sconstech.com'; // Replace with your actual domain

const links = [
  { url: '/', changefreq: 'weekly', priority: 1.0 },
  { url: '/about', changefreq: 'monthly', priority: 0.8 },
  { url: '/portfolio', changefreq: 'monthly', priority: 0.8 },
  { url: '/contact-us', changefreq: 'yearly', priority: 0.7 },
  { url: '/careers', changefreq: 'monthly', priority: 0.7 },
  { url: '/blogs', changefreq: 'weekly', priority: 0.9 },
  { url: '/packages', changefreq: 'monthly', priority: 0.7 },
  { url: '/privacy-policy', changefreq: 'yearly', priority: 0.5 },
  { url: '/terms-and-conditions', changefreq: 'yearly', priority: 0.5 },
  { url: '/thank-you', changefreq: 'yearly', priority: 0.3 }
];

const sitemap = new SitemapStream({ hostname: baseUrl });

const writeStream = createWriteStream(resolve(__dirname, 'public', 'sitemap.xml'));
sitemap.pipe(writeStream);

for (const link of links) {
  sitemap.write(link);
}
sitemap.end();

streamToPromise(sitemap)
  .then(() => console.log('✅ Sitemap generated at public/sitemap.xml'))
  .catch((error) => console.error('❌ Failed to generate sitemap:', error));
