import type { Metadata } from "next";
import localFont from "next/font/local"
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton
} from '@clerk/nextjs'
//import '@stream-io/video-react-sdk/dist/css/style.css'
import "@stream-io/video-react-sdk/dist/css/styles.css"
import "react-datepicker/dist/react-datepicker.css"
import { Toaster } from "@/components/ui/toaster"


import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "SpeedX.com",
  description: "SpeedX by Ushie Pius",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
            <ClerkProvider
              appearance={{
                layout: {
                  socialButtonsVariant: "iconButton",
                  // logoImageUrl: "/icons/yoom-logo.svg",
                },
                variables: {
                  colorText: "#fff",
                  colorPrimary: "#0E78F9",
                  colorBackground: "#1C1F2E",
                  colorInputBackground: "#252A41",
                  colorInputText: "#fff",
                },
              }}
      >
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          {children}
          <Toaster />
        </body>
      </ClerkProvider>
     
    </html>
  );
}
