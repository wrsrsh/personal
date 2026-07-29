import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { SITE_URL } from '../consts';

export const prerender = true;

const escapeXml = (value: string) =>
  value.replace(/[<>&'\"]/g, (character) => ({
    '<': '&lt;',
    '>': '&gt;',
    '&': '&amp;',
    "'": '&apos;',
    '"': '&quot;',
  })[character]!);

export const GET: APIRoute = async () => {
  const posts = (await getCollection('blog'))
    .filter((post) => post.data.published !== false)
    .map((post) => ({
      url: `${SITE_URL}/post/${post.id}/`,
      lastModified: post.data.updatedDate ?? post.data.pubDate,
    }));

  const pages = [
    { url: `${SITE_URL}/`, lastModified: undefined },
    { url: `${SITE_URL}/about`, lastModified: undefined },
    { url: `${SITE_URL}/archive`, lastModified: undefined },
    ...posts,
  ];

  const body = pages.map(({ url, lastModified }) => `  <url>
    <loc>${escapeXml(url)}</loc>${lastModified ? `\n    <lastmod>${lastModified.toISOString()}</lastmod>` : ''}
  </url>`).join('\n');

  return new Response(`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${body}
</urlset>`, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
};
