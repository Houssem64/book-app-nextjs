"use client"
import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import AppNavbar from "../components/app/AppNavbar";
import { Toaster } from 'react-hot-toast';
import { useRouter } from "next/navigation";

interface Book {
    _id: string;
    title: string;
    author: string;
    description: string;
    image: string;
}

export default function Library() {
    const [books, setBooks] = useState<Book[]>([]);
    const router = useRouter()
    useEffect(() => {
        const fetchLibrary = async () => {
            try {
                const response = await fetch('/api/library');
                if (!response.ok) {
                    throw new Error('Failed to fetch library');
                }
                const data = await response.json();
                setBooks(data);
            } catch (error) {
                console.error('Error fetching library:', error);
            }
        };
        fetchLibrary();
    }, []);

    return (
        <>
            <Toaster />
            <div className="bg-black min-h-screen">
                <AppNavbar />
                <div className="flex flex-col bg-black">
                    <h1 className="text-white p-8 text-2xl font-extrabold">My Library</h1>
                    <main className="py-8 px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {books.map((book) => (
                            <div key={book._id} className="bg-background rounded-lg shadow-lg overflow-hidden">
                                <Link href={`/book/${book._id}`}>
                                    <img src={book.image || "/placeholder.svg"} alt={`${book.title} Cover`} width={400} height={300} className="w-full h-48 object-cover" />
                                    <div className="p-4">
                                        <h3 className="text-lg font-bold mb-2">{book.title}</h3>
                                        <p className="text-muted-foreground mb-2">By {book.author}</p>
                                        <p className="text-sm line-clamp-3">{book.description}</p>
                                    </div>
                                </Link>
                                <Button
                                    className="w-full bg-blue-500 hover:bg-blue-600 text-white"
                                    onClick={() => {
                                        router.push(`/book/${book._id}`)
                                    }}
                                >
                                    Read Now
                                </Button>
                            </div>
                        ))}
                    </main>
                </div>
            </div>
        </>
    )
}