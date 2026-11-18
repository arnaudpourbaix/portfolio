// « / » n'a pas de page : redirige vers /fr ou /en selon la langue préférée du navigateur (français par défaut).
import { NextResponse, type NextRequest } from "next/server";
import { preferredLang } from "@/lib/i18n";

export function proxy(request: NextRequest) {
  return NextResponse.redirect(new URL(`/${preferredLang(request.headers.get("accept-language"))}`, request.url));
}

export const config = {
  matcher: "/",
};
