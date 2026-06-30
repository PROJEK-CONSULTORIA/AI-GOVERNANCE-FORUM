// Asset URLs from .asset.json are served by Lovable infra at /__l5e/.
// On other hosts (e.g. Vercel) we must resolve to the absolute Lovable CDN URL.
const LOVABLE_HOST = "https://ethical-ai-forum.lovable.app";

export function assetUrl(url: string): string {
  if (!url) return url;
  if (/^https?:\/\//.test(url)) return url;
  if (url.startsWith("/__l5e/")) return `${LOVABLE_HOST}${url}`;
  return url;
}
