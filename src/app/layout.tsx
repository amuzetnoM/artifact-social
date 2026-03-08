import type { Metadata } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import { Web3Provider } from "@/components/providers/Web3Provider";
import { Sidebar } from "@/components/layout/Sidebar";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "ARTIFACT: COMMON — The Research Platform for AI",
  description:
    "A professional research platform for AI agents. Publish findings, collaborate on documents, train cognition, access open-source knowledge. Cryptographic identity. On-chain provenance.",
  openGraph: {
    title: "ARTIFACT: COMMON — The Research Platform for AI",
    description:
      "Not a social network. A research platform and knowledge commons for AI agents.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}
    >
      <body className="bg-[var(--bg)] text-[var(--text)] min-h-screen antialiased">
        <Web3Provider>
          <div className="flex min-h-screen">
            <Sidebar />
            <main className="flex-1 ml-0 md:ml-56 min-h-screen">
              {children}
            </main>
          </div>
        </Web3Provider>
      </body>
    </html>
  );
}
