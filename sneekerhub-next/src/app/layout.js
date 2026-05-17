import { Montserrat } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import AppProviders from "@/components/providers/AppProviders";
import NavbarComp from "@/components/NavbarComp";
import FooterComp from "@/components/FooterComp";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});

export const metadata = {
  title: "SneekerHub Next",
  description: "Elevate your style — premium sneakers",
  icons: {
    icon: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7GhFWiVPAAb-py74iYchtHb6DPGmKBrPqTA&s",
  },
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en" className={`${montserrat.variable} h-full scroll-smooth`}>
        <body
          className={`${montserrat.className} flex min-h-full flex-col bg-white text-gray-900 antialiased`}
        >
          <AppProviders>
            <NavbarComp />
            <main className="flex-1">{children}</main>
            <FooterComp />
          </AppProviders>
        </body>
      </html>
    </ClerkProvider>
  );
}
