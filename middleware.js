import { match } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";
import { NextResponse } from "next/server";
const defaultLocale = "en";
const locales = ["en", "bn"];

function getLocale(request) {
    let acceptedLanguage = request.headers.get("accept-language") ?? undefined;
    let headers = { "accept-language": acceptedLanguage };
    let languages = new Negotiator({ headers }).languages();
    return match(languages, locales, defaultLocale); // -> 'en-US'
}

export default function middleware(request) {
    // lets check the pathname have the locale
    const pathname = request.nextUrl.pathname;
    const isMissingLocaleInPath = locales.every(
        (locale) =>
            !pathname.startsWith(`/${locale}`) &&
            !pathname.startsWith(`/${locale}/`)
    );
    if (isMissingLocaleInPath) {
        //if missing locale in pathname then detect user preferance and redirect
        const locale = getLocale(request);
        return NextResponse.redirect(
            new URL(`${locale}/${pathname}`, request.url)
        );
    }
    return NextResponse.next();
}

export const config = {
    matcher: ["/((?!_next).*)"],
};

