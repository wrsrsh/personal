import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { SITE_DESCRIPTION, SITE_TITLE, SITE_URL } from '../consts';

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
    .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
  const updated = posts[0]?.data.updatedDate ?? posts[0]?.data.pubDate ?? new Date('2026-01-01');

  const entries = posts.map((post) => {
    const url = `${SITE_URL}/post/${post.id}/`;
    const summary = post.data.description ?? post.data.excerpt ?? `An article by ${SITE_TITLE}.`;
    return `  <entry>
    <title>${escapeXml(post.data.title)}</title>
    <link href="${escapeXml(url)}" />
    <id>${escapeXml(url)}</id>
    <published>${post.data.pubDate.toISOString()}</published>
    <updated>${(post.data.updatedDate ?? post.data.pubDate).toISOString()}</updated>
    <author><name>${SITE_TITLE}</name><uri>${SITE_URL}</uri></author>
    <summary>${escapeXml(summary)}</summary>
  </entry>`;
  }).join('\n');

  return new Response(`<?xml version="1.0" encoding="utf-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
  <title>${SITE_TITLE}</title>
  <subtitle>${escapeXml(SITE_DESCRIPTION)}</subtitle>
  <link href="${SITE_URL}/feed.xml" rel="self" />
  <link href="${SITE_URL}/" />
  <id>${SITE_URL}/</id>
  <updated>${updated.toISOString()}</updated>
${entries}
</feed>`, {
    headers: { 'Content-Type': 'application/atom+xml; charset=utf-8' },
  });
};
