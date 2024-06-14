import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Transition from "./Transition";

import { getServerSession } from 'next-auth/next';
import AppNavbar from "./components/app/AppNavbar";
import { dark } from "@clerk/themes";
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton
} from '@clerk/nextjs'


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession();



  return (
    <ClerkProvider appearance={{
      baseTheme: dark
    }}>


      <html lang="en">
        <body className={inter.className}>
          <Transition>

            {children}</Transition></body>
      </html>

    </ClerkProvider>
  );
}
