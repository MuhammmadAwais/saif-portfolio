import type { Metadata, Viewport } from "next";
import "@/reference/css/portfolio-rk.webflow.5dc738e00.min.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "Editing That Brings Stories to Life",
  description:
    "Saif Latif - Dynamic Editor and Colorist. High-impact visual execution, broadcast-level color depth, and sharp visual rhythm.",
  openGraph: {
    title: "Editing That Brings Stories to Life",
    description:
      "Saif Latif - Dynamic Editor and Colorist. High-impact visual execution, broadcast-level color depth, and sharp visual rhythm.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Editing That Brings Stories to Life",
    description:
      "Saif Latif - Dynamic Editor and Colorist. High-impact visual execution, broadcast-level color depth, and sharp visual rhythm.",
  },
  icons: {
    icon: "/images/logo.png",
    apple: "/images/logo.png",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-wf-page="60c11f0c32e8479e90fbcb71"
      data-wf-site="60c11f0c32e847294cfbcb6c"
      className="w-mod-js w-mod-ix"
      suppressHydrationWarning
    >
      <body data-w-id="5f075927b33f5315850a8719" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
