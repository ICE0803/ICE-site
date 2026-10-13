import type { Metadata } from "next"
import { Inter, JetBrains_Mono } from "next/font/google"

import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { PageTransition } from "@/components/layout/page-transition"
import { MotionProvider } from "@/components/motion/motion-provider"
import { siteConfig } from "@/data/site-config"
import { motionScript } from "@/lib/motion-script"

import "./globals.css"

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
})

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  openGraph: {
    type: "website",
    locale: "zh_CN",
    url: siteConfig.url,
    siteName: siteConfig.title,
    title: siteConfig.title,
    description: siteConfig.description,
  },
  twitter: {
    card: "summary",
    title: siteConfig.title,
    description: siteConfig.description,
  },
}

const themeScript = `(function () {
  try {
    var t = localStorage.getItem("theme");
    if (t !== "light" && t !== "dark") {
      t = window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
    }
    document.documentElement.setAttribute("data-theme", t);
  } catch (e) {
    document.documentElement.setAttribute("data-theme", "dark");
  }
})();`

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="zh-CN"
      suppressHydrationWarning
      className={`${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script dangerouslySetInnerHTML={{ __html: motionScript }} />
      </head>
      <body className="flex min-h-full flex-col">
        <Header />
        <PageTransition>{children}</PageTransition>
        <Footer />
        <MotionProvider />
      </body>
    </html>
  )
}
