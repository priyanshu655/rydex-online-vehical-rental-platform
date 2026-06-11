import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Provider from "@/lib/Provider";
import ReduxProvider from "@/redux/ReduxProvider";
import InitUser from "@/InitUser";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "RYDEX - Smart Vehical Booking Platform",
  description:
    "Rydex is a modern web-based vehicle booking platform that allows users to book rides, rent vehicles, and manage transportation services through a simple and user-friendly interface. The platform connects customers with available drivers and vehicles in real time, providing a fast, secure, and convenient booking experience. It supports ride scheduling, live vehicle tracking, online payments, booking history, and driver management. Vehicle booking systems commonly include features such as vehicle availability, scheduling, payment processing, and real-time tracking.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Provider>
          <ReduxProvider>
            <InitUser>{children}</InitUser>
          </ReduxProvider>
        </Provider>
      </body>
    </html>
  );
}
