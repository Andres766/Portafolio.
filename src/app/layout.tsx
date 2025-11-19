import type { Metadata } from "next";
import { cookies } from "next/headers";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
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
  title: "Portafolio — Andres Cordoba",
  description: "Desarrollador Frontend y Backend. Contacto y proyectos.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const themeCookie = cookieStore.get("theme")?.value;
  const langCookie = cookieStore.get("lang")?.value;
  const initialThemeClass = themeCookie === "light" ? "light" : "dark";
  const initialLang = langCookie === "en" ? "en" : "es";
  return (
    <html lang={initialLang} className={initialThemeClass}>
      <head>
        {/* Ajuste inicial de tema en el cliente para soportar modo 'system' sin parpadeo */}
        <Script id="theme-init" strategy="beforeInteractive">
          {`
            (function(){
              try {
                var match = document.cookie.match(/(?:^|; )theme=([^;]+)/);
                var cookieTheme = match && match[1] ? match[1] : 'system';
                var prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
                var applied = (cookieTheme === 'system') ? (prefersDark ? 'dark' : 'light') : (cookieTheme === 'dark' ? 'dark' : 'light');
                var html = document.documentElement;
                html.classList.remove('light','dark');
                html.classList.add(applied);
              } catch(e) {}
            })();
          `}
        </Script>
        <Script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js" strategy="beforeInteractive" />
        <Script id="emailjs-init" strategy="afterInteractive">
          {`emailjs.init('GA1MNMcBlMAqcBqvv')`}
        </Script>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
