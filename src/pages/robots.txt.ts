import type { APIRoute } from 'astro';

const getRobotsTxt = () => `\
User-agent: *
Allow: /

Sitemap: https://reshi.me/sitemap.xml
`;

export const GET: APIRoute = () => {
  return new Response(getRobotsTxt(), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
