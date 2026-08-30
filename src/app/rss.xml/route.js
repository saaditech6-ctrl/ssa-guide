import RSS from 'rss';
import { articles } from '@/lib/articles';

export async function GET() {
  const siteUrl = 'https://www.socialsecurityguidecalc.com';

  const feed = new RSS({
    title: 'SSA Guide Calc - Social Security Blog',
    description: 'Latest guides, calculators, and social security updates.',
    site_url: siteUrl,
    feed_url: `${siteUrl}/rss.xml`,
    copyright: `${new Date().getFullYear()} SSA Guide Calc`,
    language: 'en',
  });

  articles.forEach((post) => {
    feed.item({
      title: post.title,
      description: post.excerpt || post.description || '',
      url: `${siteUrl}/blog/${post.slug}`,
      date: post.date,
    });
  });

  return new Response(feed.xml({ indent: true }), {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
}