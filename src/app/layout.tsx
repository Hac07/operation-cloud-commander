import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

export const metadata: Metadata = {
  title: "Operation Cloud Commander | Khush Jain – Cloud Engineering Leader",
  description:
    "Khush Jain's immersive portfolio. Cloud Engineering Leader based in Pune, India. 7+ years architecting AWS-native systems. $264K+ in proven cost savings. Open to Cloud Lead, Principal Architect, and Staff Engineer roles.",
  keywords: [
    "Cloud Engineer",
    "AWS",
    "Cloud Architect",
    "Khush Jain",
    "Pune",
    "GenAI",
    "Terraform",
    "Portfolio",
  ],
  openGraph: {
    title: "Operation Cloud Commander | Khush Jain",
    description:
      "Immersive cloud engineering portfolio. 5 high-impact missions. $264K+ savings. Open to Senior Cloud roles.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
