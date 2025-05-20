import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

export const metadata = {
  title: {
    default: "Rhythmic Bytes",
    template: "%s | Rhythmic Bytes",
  },
  description:
    "Stream music effortlessly with Rhythmic Bytes - your go-to platform for quality sound and immersive experience.",
  keywords: [
    "music",
    "streaming",
    "audio player",
    "Rhythmic Bytes",
    "songs",
    "albums",
    "playlist",
  ],
  authors: [{ name: "NetIntranet", url: "https://netintranet.vercel.app" }],
  creator: "Rhythmic Bytes",
  openGraph: {
    title: "Rhythmic Bytes",
    description:
      "Stream music effortlessly with Rhythmic Bytes - your go-to platform for quality sound and immersive experience.",
    url: "https://rhythmicbytes.vercel.app",
    siteName: "Rhythmic Bytes",
    images: [
      {
        url: "/logo.png", // 🔁 Replace with your actual OG image path
        width: 1200,
        height: 630,
        alt: "Rhythmic Bytes OG Image",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rhythmic Bytes",
    description: "Stream music effortlessly with Rhythmic Bytes.",
    site: "@rhythmicbytes", // 🔁 If you have Twitter handle
    creator: "@rhythmicbytes",
    images: ["/logo.png"],
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/logo.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} antialiased bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white`}
      >
        <Header />
        {children}
      </body>
    </html>
  );
}
