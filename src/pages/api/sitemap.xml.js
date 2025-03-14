import dbConnect from '@/lib/dbConnect';
import { Job } from '@/lib/models/Job';
import { SitemapStream, streamToPromise } from 'sitemap';
import { Readable } from 'stream';

export default async function handler(req, res) {
  try {
    await dbConnect();

    // Fetch all jobs with their slugs
    const jobs = await Job.find({}, 'slug').lean();

    // Base URL of your website
    const baseUrl = process.env.NODE_ENV === 'production' 
      ? 'https://www.vitaminjob.com' 
      : 'http://localhost:3000';

    // Create a new sitemap
    const sitemap = new SitemapStream({ hostname: baseUrl });

    // Add job URLs dynamically
    jobs.forEach((job) => {
      sitemap.write({ url: `/jobs/${job.slug}`, changefreq: 'daily', priority: 0.8 });
    });

    sitemap.end();

    // Convert stream to string and send response
    const sitemapXml = await streamToPromise(Readable.from(sitemap)).then((data) => data.toString());

    res.setHeader('Content-Type', 'application/xml');
    res.send(sitemapXml);
  } catch (error) {
    console.error('Error generating sitemap:', error);
    res.status(500).end();
  }
}
