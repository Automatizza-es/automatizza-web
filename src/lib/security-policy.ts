/**
 * Phase 1: observe before enforcing. Keep this as Report-Only until the
 * published GTM Custom JavaScript variables have been replaced and the
 * preview has passed the checklist in docs/security-csp.md.
 */
export const cspHeaderName = "Content-Security-Policy-Report-Only";

export function contentSecurityPolicy(development = false) {
  // Next's static App Router HTML contains build-specific inline Flight and
  // bootstrap scripts. A nonce would require dynamic rendering on every page;
  // SRI covers external chunks, not those inline scripts. This exception is
  // deliberate, not a claim that this is a strict nonce/hash-based CSP.
  const scripts = ["'self'", "'unsafe-inline'", "https://www.googletagmanager.com"];
  if (development) scripts.push("'unsafe-eval'"); // Next dev overlay/HMR only.
  return [
    "default-src 'self'",
    `script-src ${scripts.join(" ")}`,
    "script-src-attr 'none'",
    // React sets dynamic CSS properties for scroll progress and animations.
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: https://www.googletagmanager.com https://*.google-analytics.com",
    "font-src 'self'",
    // GA4 without Ads/Signals. No DoubleClick, Ads or arbitrary HTTPS sources.
    `connect-src 'self' https://www.googletagmanager.com https://*.google-analytics.com https://*.google.com${development ? " ws://localhost:* ws://127.0.0.1:*" : ""}`,
    "media-src 'self'",
    "frame-src https://www.googletagmanager.com",
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

export function securityHeaders(development = false) {
  return [
    { key: cspHeaderName, value: contentSecurityPolicy(development) },
    { key: "X-Content-Type-Options", value: "nosniff" },
    { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  ];
}
