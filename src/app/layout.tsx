import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Fraunces } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  axes: ["opsz", "SOFT"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0d1110" },
    { media: "(prefers-color-scheme: light)", color: "#f5f7f5" },
  ],
};

export const metadata: Metadata = {
  title: "Rishabh Pandey — Software Developer & Cloud Engineer",
  description:
    "Portfolio of Rishabh Pandey, a software developer and cloud engineer specializing in automation solutions, AI-integrated applications, and scalable cloud systems.",
  keywords: [
    "Rishabh Pandey",
    "Software Developer",
    "Cloud Engineer",
    "Automation Solutions",
    "AWS",
    "Java",
    "OpenCV",
    "Gemini API",
    "Portfolio",
    "Delhi",
  ],
  authors: [{ name: "Rishabh Pandey" }],
  icons: {
    icon: "https://z-cdn.chatglm.cn/z-ai/static/logo.svg",
  },
  openGraph: {
    title: "Rishabh Pandey — Software Developer & Cloud Engineer",
    description:
      "Building automation solutions, AI-integrated applications, and scalable cloud systems.",
    siteName: "Rishabh Pandey",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rishabh Pandey — Software Developer & Cloud Engineer",
    description:
      "Building automation solutions, AI-integrated applications, and scalable cloud systems.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${fraunces.variable} antialiased bg-background text-foreground`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
