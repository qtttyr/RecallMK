import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geist = Geist({
  subsets: ["latin", "latin-ext", "cyrillic"],
  variable: "--font-geist",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const geistMono = Geist_Mono({
  subsets: ["latin", "latin-ext", "cyrillic"],
  variable: "--font-geist-mono",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const SITE_URL = "https://recall.app";

export const viewport: Viewport = {
  themeColor: "#e7e7e5",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Recall — A quieter clipboard. A memory you can ask for.",
    template: "%s | Recall",
  },
  description:
    "Local-first neural clipboard memory for macOS. Press ⌥Space, describe what you remember, and Recall finds it — even across languages. 100% offline on Apple Silicon.",
  applicationName: "Recall",
  keywords: [
    "clipboard manager",
    "semantic search",
    "clipboard history",
    "macOS",
    "Apple Silicon",
    "Core ML",
    "offline",
    "privacy",
    "EmbeddingGemma",
    "neural clipboard",
    "recall",
    "Miras Kustaibek",
    "miras kustaibek",
  ],
  authors: [
    { name: "Miras Kustaibek", url: "https://github.com/qtttyr" },
    { name: "Recall", url: "https://github.com/qtttyr/Recall" },
  ],
  creator: "Miras Kustaibek",
  publisher: "Miras Kustaibek",
  formatDetection: { email: false, address: false, telephone: false },
  alternates: {
    canonical: "/",
    languages: { "en-US": "/", "ru-RU": "/" },
  },
  icons: {
    icon: [
      { url: "/icon.png", sizes: "512x512", type: "image/png" },
      { url: "/favicon.ico", sizes: "48x48" },
    ],
    apple: [{ url: "/icon.png", sizes: "512x512" }],
    shortcut: "/icon.png",
  },
  manifest: "/site.webmanifest",
  openGraph: {
    title: "Recall — A quieter clipboard. A memory you can ask for.",
    description:
      "Search your clipboard by meaning. English & Russian. 100% offline on Apple Silicon.",
    url: SITE_URL,
    siteName: "Recall",
    locale: "en_US",
    alternateLocale: ["ru_RU"],
    type: "website",
    images: [
      {
        url: "/icon.png",
        width: 512,
        height: 512,
        alt: "Recall app icon",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Recall — A quieter clipboard. A memory you can ask for.",
    description:
      "Search your clipboard by meaning. English & Russian. 100% offline on Apple Silicon.",
    images: ["/icon.png"],
    creator: "@gray_chromatic",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || "",
  },
  category: "technology",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geist.variable} ${geistMono.variable} antialiased`}>
      <head>
        <link rel="canonical" href={SITE_URL} />
      </head>
      <body className="min-h-full bg-[#e7e7e5] text-[#0a0a0a]">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              {
                "@context": "https://schema.org",
                "@type": "SoftwareApplication",
                name: "Recall",
                operatingSystem: "macOS 15+",
                applicationCategory: "UtilitiesApplication",
                description:
                  "Local-first neural clipboard memory for macOS. Press ⌥Space, describe what you remember, and Recall finds it — even across languages.",
                url: "https://recall.app",
                author: { "@type": "Person", name: "Miras Kustaibek", url: "https://github.com/qtttyr" },
                creator: { "@type": "Person", name: "Miras Kustaibek" },
                offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
              },
              {
                "@context": "https://schema.org",
                "@type": "WebSite",
                name: "Recall",
                url: "https://recall.app",
                author: { "@type": "Person", name: "Miras Kustaibek" },
                inLanguage: ["en", "ru"],
              },
              {
                "@context": "https://schema.org",
                "@type": "Person",
                name: "Miras Kustaibek",
                url: "https://github.com/qtttyr",
                sameAs: ["https://github.com/qtttyr/Recall", "mailto:mirasbusy@gmail.com"],
              },
            ]),
          }}
        />
        {children}
      </body>
    </html>
  );
}
