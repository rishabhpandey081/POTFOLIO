import type { Metadata } from "next";
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

export const metadata: Metadata = {
  title: "Rishabh Pandey — Full-Stack & AI Engineer",
  description:
    "Portfolio of Rishabh Pandey, a B.Tech IT student and full-stack developer specializing in AI-integrated web applications, computer vision, and scalable React systems.",
  keywords: [
    "Rishabh Pandey",
    "Full-Stack Developer",
    "AI Engineer",
    "React.js",
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
    title: "Rishabh Pandey — Full-Stack & AI Engineer",
    description:
      "Building AI-integrated web applications and real-time computer vision systems.",
    siteName: "Rishabh Pandey",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rishabh Pandey — Full-Stack & AI Engineer",
    description:
      "Building AI-integrated web applications and real-time computer vision systems.",
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
