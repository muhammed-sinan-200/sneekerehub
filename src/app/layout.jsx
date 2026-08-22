import { Montserrat } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import AppProviders from "@/components/layout/AppProviders";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});

export const metadata = {
  title: "SneekerHub",
  description: "Elevate your style — premium sneakers",
  icons: {
    icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7GhFWiVPAAb-py74iYchtHb6DPGmKBrPqTA&s",
  },
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en" className={`${montserrat.variable} h-full data-scroll-behavior="smooth"`}>
        <body
          className={`${montserrat.className} flex min-h-full flex-col bg-white text-gray-900 antialiased`}
        >
          <AppProviders>
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </AppProviders>
        </body>
      </html>
    </ClerkProvider>
  );
}
