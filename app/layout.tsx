import type { Metadata } from "next";
import localFont from "next/font/local"
import {
  ClerkProvider,
  
} from '@clerk/nextjs'
//import '@stream-io/video-react-sdk/dist/css/style.css'
import "@stream-io/video-react-sdk/dist/css/styles.css"
import "react-datepicker/dist/react-datepicker.css"
import { Toaster } from "@/components/ui/toaster"


import "./globals.css";



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
         
        >
          {children}
          <Toaster />
        </body>
      </ClerkProvider>
     
    </html>
  );
}
