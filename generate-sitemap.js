import { SitemapStream, streamToPromise } from 'sitemap';
import { createWriteStream } from 'fs';
import { resolve } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import client from './src/lib/sanityClient.js';
import projects from './src/data/projects.json' assert { type: 'json' };
import { services } from './src/components/Services/servicesForSitemap.js';

// __dirname polyfill for ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Your domain
const baseUrl = 'https://sconstech.com';

// Slugify function (you can reuse this if needed)
const generateSlug = (name) =>
  name
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/--+/g, '-')
    .trim();

// Static and portfolio links
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

// Add portfolio pages from local JSON
projects.forEach(project => {
  const slug = generateSlug(project.heading);
  links.push({
    url: `/portfolio/${slug}`,
    changefreq: 'yearly',
    priority: 0.6
  });
});

// Add services pages from services array
services.forEach(service => {
  if (service.slug) {
    links.push({
      url: `/service/${service.slug}`,
      changefreq: 'monthly',
      priority: 0.7,
    });
  }
});

// Main sitemap generation function
async function generateSitemap() {
  try {
    // Fetch blog post slugs from Sanity
    const blogPosts = await client.fetch(`*[_type == "post"]{ "slug": slug.current }`);

    blogPosts.forEach((post) => {
      if (post.slug) {
        links.push({
          url: `/blogs/${post.slug}`,
          changefreq: 'weekly',
          priority: 0.7,
        });
      }
    });

    // Create sitemap stream and file
    const sitemap = new SitemapStream({ hostname: baseUrl });
    const writeStream = createWriteStream(resolve(__dirname, 'public', 'sitemap.xml'));
    sitemap.pipe(writeStream);

    // Write all collected links
    for (const link of links) {
      sitemap.write(link);
    }
    sitemap.end();

    await streamToPromise(sitemap);
    console.log('✅ Sitemap generated at public/sitemap.xml');
  } catch (error) {
    console.error('❌ Failed to generate sitemap:', error);
  }
}

generateSitemap();
