"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Navbar from "./Navbar";
import PDFViewer from 'pdf-viewer-reactjs'

export default function Component() {
  const session = useSession();
  const router = useRouter();
  if (session.status === "authenticated") {
    router.push("/app");
  }
  else null;

  return (
    <div className="bg-[#141414] text-white ">

      <Navbar />
      <section className="px-4 py-20 max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between">
        <div className="space-y-4 max-w-md mx-auto md:max-w-none">
          <h1 className="text-4xl md:text-5xl font-bold">Unlock the World of Books</h1>
          <p className="text-base md:text-lg text-gray-300">
            Discover a vast collection of books, from bestsellers to hidden gems. Start reading today and embark on a
            journey of knowledge and imagination.
          </p>
          <Link href="/signup" > <Button className="mt-4 bg-[#e50914] hover:bg-[#950e15] px-4 py-2 rounded text-base md:text-lg hover:scale-110 transition">Start Reading</Button></Link>

        </div>
        <div className="relative rounded-lg overflow-hidden shadow-lg">
          <img
            alt="Featured Book"
            className="w-full h-full object-cover"
            height={600}
            src="/java.jpg"
            style={{
              aspectRatio: "400/600",
              objectFit: "cover",
            }}
            width={400}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-gray-900 to-transparent">
            <h2 className="text-2xl font-bold mb-2">The Great Gatsby</h2>
            <p className="text-gray-400">F. Scott Fitzgerald</p>
          </div>
        </div>

      </section>
      <section className="px-4 py-20 max-w-7xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold mb-8">Featured Books</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <div className="bg-[#1f1f1f] rounded-lg overflow-hidden shadow-lg">
            <img
              alt="Book 1"
              className="w-full h-auto"
              height={450}
              src="/gat.jpg"
              style={{
                aspectRatio: "300/450",
                objectFit: "cover",
              }}
              width={300}
            />
            <div className="p-4">
              <h3 className="text-xl font-bold mb-2">The Great Gatsby</h3>
              <p className="text-gray-300">F. Scott Fitzgerald</p>
            </div>
          </div>
          <div className="bg-[#1f1f1f] rounded-lg overflow-hidden shadow-lg">
            <img
              alt="Book 2"
              className="w-full h-auto"
              height={450}
              src="/kill.jpg"
              style={{
                aspectRatio: "300/450",
                objectFit: "cover",
              }}
              width={300}
            />
            <div className="p-4">
              <h3 className="text-xl font-bold mb-2">To Kill a Mockingbird</h3>
              <p className="text-gray-300">Harper Lee</p>
            </div>
          </div>
          <div className="bg-[#1f1f1f] rounded-lg overflow-hidden shadow-lg">
            <img
              alt="Book 3"
              className="w-full h-auto"
              height={450}
              src="/1984.jpg"
              style={{
                aspectRatio: "300/450",
                objectFit: "cover",
              }}
              width={300}
            />
            <div className="p-4">
              <h3 className="text-xl font-bold mb-2">1984</h3>
              <p className="text-gray-300">George Orwell</p>
            </div>
          </div>
          <div className="bg-[#1f1f1f] rounded-lg overflow-hidden shadow-lg">
            <img
              alt="Book 4"
              className="w-full h-auto"
              height={450}
              src="/pride.jpg"
              style={{
                aspectRatio: "300/450",
                objectFit: "cover",
              }}
              width={300}
            />
            <div className="p-4">
              <h3 className="text-xl font-bold mb-2">Pride and Prejudice</h3>
              <p className="text-gray-300">Jane Austen</p>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-[#1f1f1f] py-20">
        <div className="px-4 max-w-7xl mx-auto text-center space-y-4">
          <h2 className="text-2xl md:text-3xl font-bold">Start Your Reading Journey</h2>
          <p className="text-base md:text-lg text-gray-300">
            Join our community of book lovers and unlock a world of endless possibilities.
          </p>
          <Button className="mt-4 bg-[#e50914] hover:bg-[#f40612] px-4 py-2 rounded text-base md:text-lg">Sign Up Now</Button>
        </div>
      </section>
      <footer className="bg-[#1f1f1f] py-8 text-gray-300">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
          <div>
            <Link className="text-xl md:text-2xl font-bold" href="#">
              BookWorm
            </Link>
            <p className="text-xs md:text-sm mt-2">© 2024 BookWorm. All rights reserved.</p>
          </div>
          <nav className="flex space-x-4 md:space-x-6">
            <Link className="hover:underline" href="#">
              About
            </Link>
            <Link className="hover:underline" href="#">
              Contact
            </Link>
            <Link className="hover:underline" href="#">
              Privacy Policy
            </Link>
            <Link className="hover:underline" href="#">
              Terms of Service
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}