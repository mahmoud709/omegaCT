import type { Metadata } from "next";
import { Cairo, Cinzel, Inter, Playfair_Display } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getLocale } from "next-intl/server";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { WhatsAppButton } from "./components/WhatsAppButton";
import { seoDescription } from "./data/site";
import { HideOnAdmin } from "./components/HideOnAdmin";
import { SplashScreen } from "./components/SplashScreen";
import { getDirection, isLocale } from "../i18n/request";
import { getCachedProfile } from "@/lib/getProfile";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  display: "swap",
});

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic", "latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Omega Contracting & Trading",
    template: "%s | Omega Contracting & Trading",
  },
  description: seoDescription,
  keywords: [
    "construction Egypt",
    "contracting company Egypt",
    "luxury construction",
    "Four Seasons contractor",
    "New Capital Egypt",
    "Omega Contracting and Trading",
  ],
  openGraph: {
    title: "Omega Contracting & Trading",
    description: seoDescription,
    type: "website",
    locale: "en_US",
    siteName: "Omega Contracting & Trading",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const requestedLocale = await getLocale();
  const locale = isLocale(requestedLocale) ? requestedLocale : "en";
  const direction = getDirection(locale);

  let logoUrl = undefined;
  try {
    const profile = await getCachedProfile();
    const pLogo = profile.find(t => t.key === "logo");
    if (pLogo && pLogo.en) logoUrl = pLogo.en;
  } catch(e) {}

  return (
    <html
      lang={locale}
      dir={direction}
      className={`${inter.variable} ${playfair.variable} ${cinzel.variable} ${cairo.variable} scroll-smooth`}
    >
      <head>
        <link rel="preconnect" href="https://res.cloudinary.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://res.cloudinary.com" />
      </head>
      <body suppressHydrationWarning>
        <NextIntlClientProvider>
          <HideOnAdmin>
            <SplashScreen />
            <Header logoUrl={logoUrl} />
          </HideOnAdmin>
          <main>{children}</main>
          <HideOnAdmin>
            <Footer />
            <WhatsAppButton />
          </HideOnAdmin>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
