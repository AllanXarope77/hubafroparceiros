const fallbackSiteUrl = "https://hubafroparceiros.vercel.app";

export function getSiteUrl() {
  const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  const vercelUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim();
  const siteUrl = configuredUrl || (vercelUrl ? `https://${vercelUrl}` : fallbackSiteUrl);

  return siteUrl.replace(/\/$/, "");
}
