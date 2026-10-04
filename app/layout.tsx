import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";

const font = DM_Sans({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800"], style: ["normal", "italic"], variable: "--font-dm-sans" });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: "Sahil Kumar | Generative AI Engineer",
  description: "Portfolio of Sahil Kumar: RAG systems, multi-agent apps and LLM engineering.",
  openGraph: {
    title: "Sahil Kumar | Generative AI Engineer",
    description: "RAG systems, multi-agent apps and LLM engineering.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sahil Kumar | Generative AI Engineer",
    description: "RAG systems, multi-agent apps and LLM engineering.",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={font.variable}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
