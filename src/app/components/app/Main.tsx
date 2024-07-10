"use client";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RadioGroupItem, RadioGroup } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { useEffect, useState } from "react";
import BookCard from "../book/BookCard";
import axios from 'axios';

interface Book {
    _id: number;
    title: string;
    image: string;
    description: string;
    author: string;
    content: string;
    tags: string[];
    rating: number;
    // Add more fields if needed
}

const Main = () => {
    const [selectedTag, setSelectedTag] = useState('all'); // For tag filter buttons
    const [searchQuery, setSearchQuery] = useState(''); // For search bar
    const [books, setBooks] = useState<Book[]>([]);
    const [loading, setLoading] = useState(true);

    const tags = ["ut", "non-fiction", "mystery", "romance", "fantasy", "science", "history", "biography", "self-help", "children"];

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await axios.get('/api/books');
                setBooks(response.data);
                console.log(response.data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchBooks();
    }, []);

    if (loading) {
        return (
            <div className="h-screen flex justify-center items-center bg-black">
                <svg fill='none' className="w-6 h-6 animate-spin text-white" viewBox="0 0 32 32" xmlns='http://www.w3.org/2000/svg'>
                    <path clip-rule='evenodd' d='M15.165 8.53a.5.5 0 01-.404.58A7 7 0 1023 16a.5.5 0 011 0 8 8 0 11-9.416-7.874.5.5 0 01.58.404z' fill='currentColor' fill-rule='evenodd' />
                </svg>
                <div className="text-white">Loading ...</div>
            </div>
        );
    }

    const filteredBooks = books.filter((book: Book) => {
        const searchTerm = searchQuery.toLowerCase();
        const tagsString = book.tags.join(" ").toLowerCase();

        const matchesSearchQuery = book.title.toLowerCase().includes(searchTerm) ||
            book.author.toLowerCase().includes(searchTerm) ||
            book.description.toLowerCase().includes(searchTerm) ||
            tagsString.includes(searchTerm);

        if (selectedTag === 'all') {
            return matchesSearchQuery;
        } else {
            return matchesSearchQuery && book.tags.includes(selectedTag);
        }
    });

    function handleSearch(term: string) {
        setSearchQuery(term);
        console.log(term);
    }

    function handleTagChange(tag: string) {
        setSelectedTag(tag);
        console.log(tag);
    }

    function handleFilterReset() {
        setSelectedTag('all');
        setSearchQuery('');
    }

    return (
        <div className="flex flex-col">
            <main className="flex-1 bg-none dark:bg-gray-900 py-8 px-6">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-4">
                        <Button className="text-gray-600 dark:text-gray-400" variant="outline" onClick={handleFilterReset}>
                            <FilterAltIcon className="mr-2" />
                            Reset Filters
                        </Button>
                        <div className="flex items-center gap-4">
                            {tags.map((tag) => (
                                <Button
                                    key={tag}
                                    variant={selectedTag === tag ? "default" : "outline"}
                                    onClick={() => handleTagChange(tag)}
                                    className={selectedTag === tag ? "bg-blue-500 text-white" : "text-gray-600 dark:text-gray-400"}
                                >
                                    {tag}
                                </Button>
                            ))}
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <Input
                            type="text"
                            placeholder="Search..."
                            value={searchQuery}
                            onChange={(e) => handleSearch(e.target.value)}
                            className="hover:scale-125 transition duration-300 ease-in-out mr-4 text-white caret-white"
                        />
                    </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {filteredBooks.length > 0 ? (
                        filteredBooks.map((book, i) => (
                            <li key={i}>
                                <a href={`/bookinfo/${book._id}`} style={{ textDecoration: 'none' }}>
                                    <BookCard title={book.title} coverImage={book.image} description={book.description} author={book.author} tags={book.tags} rating={book.rating} />
                                </a>
                            </li>
                        ))
                    ) : (
                        <div className="col-span-full flex items-center justify-center text-center text-white w-full h-[80vh]">No books found</div>
                    )}
                </div>
            </main>
        </div>
    );
}

export default Main;
