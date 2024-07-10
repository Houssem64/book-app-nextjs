"use client"
import { useEffect, useState } from "react";
import Link from "next/link";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import AppNavbar from "../components/app/AppNavbar";
import EditIcon from '@mui/icons-material/Edit';

interface Book {
    _id: string;
    title: string;
    author: string;
    description: string;
    image: string;
}

export default function Component() {
    const [books, setBooks] = useState<Book[]>([]);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await fetch('/api/books/userid');
                if (!response.ok) {
                    throw new Error('Failed to fetch books');
                }
                const data = await response.json();
                setBooks(data);
            } catch (error) {
                console.error('Error fetching books:', error);
            }
        };
        fetchBooks();
    }, []);

    return (
        <div className="bg-black min-h-screen">
            <AppNavbar />
            <div className="flex flex-col bg-black">
                <h1 className="text-white p-8 text-2xl font-extrabold">My Publications</h1>
                <main className="py-8 px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {books.map((book) => (
                        <Link href={`/edit-book/${book._id}`} key={book._id}>
                            <div className="relative bg-background rounded-lg shadow-lg overflow-hidden cursor-pointer transform transition duration-300 hover:scale-105 group">
                                <img src={book.image || "/placeholder.svg"} alt={`${book.title} Cover`} width={400} height={300} className="w-full h-48 object-cover" />
                                <div className="p-4">
                                    <h3 className="text-lg font-bold mb-2">{book.title}</h3>
                                    <p className="text-muted-foreground mb-2">By {book.author}</p>
                                    <p className="text-sm line-clamp-3">{book.description}</p>
                                </div>
                                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-70 transition-all duration-300 flex items-center justify-center">
                                    <EditIcon className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ fontSize: '3rem' }} />
                                </div>
                            </div>
                        </Link>
                    ))}
                </main>
            </div>
        </div>
    )
}