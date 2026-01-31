import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Eranga Jayasooriya",
    template: "%s | Eranga Jayasooriya",
  },
  description:
    "Eranga Jayasooriya - Full Stack Developer & AI Engineer specializing in React, Next.js, Node.js, Python, and AI/ML applications. Building intelligent, modern web and mobile experiences.",
  keywords: [
    "Eranga Jayasooriya",
    "Full Stack Developer",
    "AI Engineer",
    "Software Engineer",
    "React Developer",
    "Next.js Developer",
    "Node.js Developer",
    "Python Developer",
    "Machine Learning",
    "Web Development",
    "Mobile Development",
    "Sri Lanka Developer",
    "Portfolio",
  ],
  authors: [{ name: "Eranga Jayasooriya" }],
  creator: "Eranga Jayasooriya",
  publisher: "Eranga Jayasooriya",
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
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://erangajayasooriya.com",
    siteName: "Eranga Jayasooriya Portfolio",
    title: "Eranga Jayasooriya | Full Stack Developer & AI Engineer",
    description:
      "Full Stack Developer & AI Engineer specializing in React, Next.js, Node.js, Python, and AI/ML applications. Building intelligent, modern web and mobile experiences.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Eranga Jayasooriya - Full Stack Developer & AI Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Eranga Jayasooriya | Full Stack Developer & AI Engineer",
    description:
      "Full Stack Developer & AI Engineer specializing in React, Next.js, Node.js, Python, and AI/ML applications.",
    images: ["/og-image.png"],
    creator: "@erangajayasooriya",
  },
  verification: {
    google: "your-google-verification-code",
  },
  alternates: {
    canonical: "https://erangajayasooriya.com",
  },
  category: "technology",
};

// JSON-LD Structured Data
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Eranga Jayasooriya",
  url: "https://erangajayasooriya.com",
  image: "https://erangajayasooriya.com/jd.jpg",
  sameAs: [
    "https://github.com/erangajayasooriya",
    "https://linkedin.com/in/erangajayasooriya",
  ],
  jobTitle: "Full Stack Developer & AI Engineer",
  worksFor: {
    "@type": "Organization",
    name: "Freelance",
  },
  description:
    "Full Stack Developer & AI Engineer specializing in React, Next.js, Node.js, Python, and AI/ML applications.",
  knowsAbout: [
    "Web Development",
    "Mobile Development",
    "Artificial Intelligence",
    "Machine Learning",
    "React",
    "Next.js",
    "Node.js",
    "Python",
    "TypeScript",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
