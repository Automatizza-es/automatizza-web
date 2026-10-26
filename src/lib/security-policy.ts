/** GTM v3 replaces Custom JavaScript with CSP-compatible typed templates.
 * Optimized builds enforce the policy; next dev stays Report-Only for HMR.
 * Validation and remaining inline-script exception: docs/security-csp.md.
 */
export const cspHeaderName = "Content-Security-Policy";

export function contentSecurityPolicy(development = false, preview = false) {
  // Next's static App Router HTML contains build-specific inline Flight and
  // bootstrap scripts. A nonce would require dynamic rendering on every page;
  // SRI covers external chunks, not those inline scripts. This exception is
  // deliberate, not a claim that this is a strict nonce/hash-based CSP.
  const scripts = ["'self'", "'unsafe-inline'", "https://www.googletagmanager.com"];
  // Debugging sources are limited to Vercel Preview, never the commercial site.
  if (preview) scripts.push("https://vercel.live", "https://tagmanager.google.com");
  if (development) scripts.push("'unsafe-eval'"); // Next dev overlay/HMR only.
  return [
    "default-src 'self'",
    `script-src ${scripts.join(" ")}`,
    "script-src-attr 'none'",
    // React sets dynamic CSS properties for scroll progress and animations.
    `style-src 'self' 'unsafe-inline'${preview ? " https://vercel.live https://tagmanager.google.com https://fonts.googleapis.com" : ""}`,
    `img-src 'self' data: https://www.googletagmanager.com https://*.google-analytics.com${preview ? " https://vercel.live https://vercel.com blob: https://ssl.gstatic.com https://www.gstatic.com" : ""}`,
    `font-src 'self'${preview ? " https://vercel.live https://assets.vercel.com https://fonts.gstatic.com data:" : ""}`,
    // GA4 without Ads/Signals. No DoubleClick, Ads or arbitrary HTTPS sources.
    `connect-src 'self' https://www.googletagmanager.com https://*.google-analytics.com https://*.google.com${preview ? " https://vercel.live wss://ws-us3.pusher.com" : ""}${development ? " ws://localhost:* ws://127.0.0.1:*" : ""}`,
    "media-src 'self'",
    `frame-src https://www.googletagmanager.com${preview ? " https://vercel.live" : ""}`,
    "worker-src 'none'",
    "object-src 'none'",
    "base-uri 'none'",
    "form-action 'self'",
    "frame-ancestors 'none'",
    "manifest-src 'self'",
    // Relative endpoint keeps local/preview reports out of production.
    // report-uri retains broad browser support without a third-party collector.
    "report-uri /api/csp-report",
  ].join("; ");
}

export function securityHeaders(development = false, preview = false) {
  return [
    { key: development ? "Content-Security-Policy-Report-Only" : cspHeaderName, value: contentSecurityPolicy(development, preview) },
    { key: "X-Content-Type-Options", value: "nosniff" },
    { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  ];
}
