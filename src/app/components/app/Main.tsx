"use client";
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { DropdownMenuTrigger, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuContent, DropdownMenu } from "@/components/ui/dropdown-menu"
import { RadioGroupItem, RadioGroup } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import SearchIcon from '@mui/icons-material/Search';
import StarIcon from '@mui/icons-material/Star';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import { Suspense, useEffect, useState } from "react"
import BookCard from "../book/BookCard";

import axios from 'axios';
interface Book {
    _id: number;
    title: string;
    image: string;
    description: string;
    author: string;
    content: string;
    tags: string;
    rating: number;
    // Add more fields if needed
}


const Main = () => {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await axios.get('/api/books');
                setBooks(response.data);
                console.log(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchBooks();
    }, []);
    return (

        <div className="flex flex-col ">
            <main className="flex-1 bg-none dark:bg-gray-900 py-8 px-6">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-4">
                        <Button className="text-gray-600 dark:text-gray-400" variant="outline">
                            <FilterAltIcon className="mr-2" />
                            Filters
                        </Button>
                        <RadioGroup className="flex items-center gap-4" defaultValue="all">
                            <RadioGroupItem className="peer sr-only" id="all" value="all" />
                            <Label
                                className="px-4 py-2 rounded-md bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer peer-checked:bg-blue-500 peer-checked:text-white"
                                htmlFor="all"
                            >
                                All
                            </Label>
                            <RadioGroupItem className="peer sr-only" id="fiction" value="fiction" />
                            <Label
                                className="px-4 py-2 rounded-md bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer peer-checked:bg-blue-500 peer-checked:text-white"
                                htmlFor="fiction"
                            >
                                Fiction
                            </Label>
                            <RadioGroupItem className="peer sr-only" id="non-fiction" value="non-fiction" />
                            <Label
                                className="px-4 py-2 rounded-md bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer peer-checked:bg-blue-500 peer-checked:text-white"
                                htmlFor="non-fiction"
                            >
                                Non-Fiction
                            </Label>
                        </RadioGroup>
                    </div>
                    <div className="flex items-center gap-4">
                        <Button className="text-gray-600 dark:text-gray-400" variant="outline">
                            <StarIcon className="mr-2" />
                            Top Rated
                        </Button>
                        <Button className="text-gray-600 dark:text-gray-400" variant="outline">
                            <LocalOfferIcon className="mr-2" />
                            My Tags
                        </Button>
                    </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

                    {
                        books.map((book: Book, i) => (

                            <li

                                key={i}>
                                <a href={`/book/${book._id}`} style={{ textDecoration: 'none' }} >
                                    <BookCard title={book.title} coverImage={book.image} description={book.description} author={book.author} tags={book.tags} rating={book.rating} />
                                </a>
                            </li>)
                        )
                    }



                    {/*  {books.map((book) => (
                        <div key={book.id} className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md">
                            <img
                                alt="Book Cover"
                                className="w-full h-[400px] object-cover"
                                height={400}
                                src={book.coverImage || "/placeholder.svg"}
                                style={{
                                    aspectRatio: "300/400",
                                    objectFit: "cover",
                                }}
                                width={300}
                            />
                            <div className="p-4">
                                <h3 className="text-lg font-bold mb-2">{book.title}</h3>
                                <p className="text-gray-600 dark:text-gray-400 mb-4">{book.author}</p>
                                <div className="flex items-center gap-2 mb-4">
                                    {Array(5).fill().map((_, i) => (
                                        <StarIcon key={i} className={i < book.rating ? "text-yellow-500" : "text-gray-400 dark:text-gray-600"} />
                                    ))}
                                </div>
                                <div className="flex items-center gap-2">
                                    {book.genres.map((genre, index) => (
                                        <div key={index}>{genre}</div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))} */}
                    {/*                     <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md">
                        <img
                            alt="Book Cover"
                            className="w-full h-[400px] object-cover"
                            height={400}
                            src="/placeholder.svg"
                            style={{
                                aspectRatio: "300/400",
                                objectFit: "cover",
                            }}
                            width={300}
                        />
                        <div className="p-4">
                            <h3 className="text-lg font-bold mb-2">Atomic Habits</h3>
                            <p className="text-gray-600 dark:text-gray-400 mb-4">James Clear</p>
                            <div className="flex items-center gap-2 mb-4">
                                <StarIcon className="text-yellow-500" />
                                <StarIcon className="text-yellow-500" />
                                <StarIcon className="text-yellow-500" />
                                <StarIcon className="text-yellow-500" />
                                <StarIcon className="text-gray-400 dark:text-gray-600" />
                            </div>
                            <div className="flex items-center gap-2">
                                <div>Non-Fiction</div>
                                <div>Self-Help</div>
                                <div>Productivity</div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md">
                        <img
                            alt="Book Cover"
                            className="w-full h-[400px] object-cover"
                            height={400}
                            src="/placeholder.svg"
                            style={{
                                aspectRatio: "300/400",
                                objectFit: "cover",
                            }}
                            width={300}
                        />
                        <div className="p-4">
                            <h3 className="text-lg font-bold mb-2">The Subtle Art of Not Giving a F*ck</h3>
                            <p className="text-gray-600 dark:text-gray-400 mb-4">Mark Manson</p>
                            <div className="flex items-center gap-2 mb-4">
                                <StarIcon className="text-yellow-500" />
                                <StarIcon className="text-yellow-500" />
                                <StarIcon className="text-yellow-500" />
                                <StarIcon className="text-yellow-500" />
                                <StarIcon className="text-yellow-500" />
                            </div>
                            <div className="flex items-center gap-2">
                                <div>Non-Fiction</div>
                                <div>Self-Help</div>
                                <div>Humor</div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md">
                        <img
                            alt="Book Cover"
                            className="w-full h-[400px] object-cover"
                            height={400}
                            src="/placeholder.svg"
                            style={{
                                aspectRatio: "300/400",
                                objectFit: "cover",
                            }}
                            width={300}
                        />
                        <div className="p-4">
                            <h3 className="text-lg font-bold mb-2">The Alchemist</h3>
                            <p className="text-gray-600 dark:text-gray-400 mb-4">Paulo Coelho</p>
                            <div className="flex items-center gap-2 mb-4">
                                <StarIcon className="text-yellow-500" />
                                <StarIcon className="text-yellow-500" />
                                <StarIcon className="text-yellow-500" />
                                <StarIcon className="text-yellow-500" />
                                <StarIcon className="text-gray-400 dark:text-gray-600" />
                            </div>
                            <div className="flex items-center gap-2">
                                <div>Fiction</div>
                                <div>Inspirational</div>
                                <div>Adventure</div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md">
                        <img
                            alt="Book Cover"
                            className="w-full h-[400px] object-cover"
                            height={400}
                            src="/placeholder.svg"
                            style={{
                                aspectRatio: "300/400",
                                objectFit: "cover",
                            }}
                            width={300}
                        />
                        <div className="p-4">
                            <h3 className="text-lg font-bold mb-2">Educated</h3>
                            <p className="text-gray-600 dark:text-gray-400 mb-4">Tara Westover</p>
                            <div className="flex items-center gap-2 mb-4">
                                <StarIcon className="text-yellow-500" />
                                <StarIcon className="text-yellow-500" />
                                <StarIcon className="text-yellow-500" />
                                <StarIcon className="text-yellow-500" />
                                <StarIcon className="text-yellow-500" />
                            </div>
                            <div className="flex items-center gap-2">
                                <div>Non-Fiction</div>
                                <div>Memoir</div>
                                <div>Education</div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md">
                        <img
                            alt="Book Cover"
                            className="w-full h-[400px] object-cover"
                            height={400}
                            src="/placeholder.svg"
                            style={{
                                aspectRatio: "300/400",
                                objectFit: "cover",
                            }}
                            width={300}
                        />
                        <div className="p-4">
                            <h3 className="text-lg font-bold mb-2">The Kite Runner</h3>
                            <p className="text-gray-600 dark:text-gray-400 mb-4">Khaled Hosseini</p>
                            <div className="flex items-center gap-2 mb-4">
                                <StarIcon className="text-yellow-500" />
                                <StarIcon className="text-yellow-500" />
                                <StarIcon className="text-yellow-500" />
                                <StarIcon className="text-yellow-500" />
                                <StarIcon className="text-gray-400 dark:text-gray-600" />
                            </div>
                            <div className="flex items-center gap-2">
                                <div>Fiction</div>
                                <div>Drama</div>
                                <div>Historical</div>
                            </div>
                        </div>
                    </div> */}

                </div>
            </main>
        </div>

    );
}

export default Main;