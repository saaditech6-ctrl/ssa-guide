import { NextRequest, NextResponse } from "next/server";

const CANONICAL_HOST = "www.socialsecurityguidecalc.com";
const LOCAL_HOSTS = new Set(["localhost", "127.0.0.1", "[::1]"]);

export function middleware(request: NextRequest) {
  const url = request.nextUrl;
  const requestHost = url.hostname.toLowerCase();

  if (LOCAL_HOSTS.has(requestHost)) {
    return NextResponse.next();
  }

  const forwardedProto = request.headers.get("x-forwarded-proto") ?? "https";
  const isSecure = forwardedProto === "https" || url.protocol === "https:";

  if (!isSecure || requestHost !== CANONICAL_HOST) {
    const redirectUrl = new URL(request.url);
    redirectUrl.protocol = "https:";
    redirectUrl.hostname = CANONICAL_HOST;

    return NextResponse.redirect(redirectUrl, 308);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)",
  ],
};
