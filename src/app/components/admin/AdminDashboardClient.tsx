
"use client";
import { useAuth } from '@clerk/nextjs';
import { useEffect, useState } from "react";
import { format } from 'date-fns';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import toast, { Toaster } from "react-hot-toast";
import Link from "next/link";

import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import axios from "axios";
interface EmailAddress {
    id: string;
    emailAddress: string;
    verification: {
        status: string;
        strategy: string;
        externalVerificationRedirectURL: string | null;
        attempts: number | null;
        expireAt: number | null;
        nonce: string | null;
    };
    linkedTo: { id: string; type: string }[];
}
interface User {
    id: number;
    username: string | null;
    firstName: string;
    lastName: string;
    emailAddresses: EmailAddress[];
    createdAt: number;
    publicMetadata: Record<string, any>;
}
interface UserDataResponse {
    data: User[];
    totalCount: number;
}

interface Book {
    _id: number;
    title: string;
    image: string;
    description: string;
    author: string;
    content: string;
    tags: string[];
    rating: number;
    createdAt: string;
    // Add more fields if needed
}
export default function AdminDashboardClient() {
    const [selectedSection, setSelectedSection] = useState("books");
    const [users, setUsers] = useState<User[]>([]);
    const [books, setBooks] = useState<Book[]>([]);
    const [loading, setLoading] = useState(true);


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

    useEffect(() => {
        const fetcUserhData = async () => {
            try {
                const response = await axios.get('/api/users');


                /*           const userDetails: User[] = data.map((user: any) => ({
                              id: user.id,
                              username: user.username,
                              firstname: user.first_name,
                              lastname: user.last_name,
                              email: user.email_addresses[0]?.email_address,
                              created_at: user.created_at
                          })); */
                console.log(response.data);
                const data: UserDataResponse = await response.data;
                setUsers(data.data);
            } catch (error) {
                console.error('Failed to fetch data:', error);
            }
        };

        fetcUserhData();
    }, []);

    const handleDeleteBook = async (bookId: number) => {
        try {
            const response = await axios.delete(`/api/books/${bookId}`);

            if (response.status >= 200 && response.status < 300) {
                // Filter out the book with the specified ID from the local state if the delete was successful
                const updatedBooks = books.filter(book => book._id !== bookId);
                // Update the state
                setBooks(updatedBooks);
                toast.success('Book deleted successfully');
            } else {
                // Handle any errors, e.g., show a message to the user
                console.error('Failed to delete the book');
            }
        } catch (error) {
            console.error('Failed to delete the book', error);
        }
    };
    const handleUserBan = async (userId: number) => {
        try {
            const response = await axios.post(`/api/users/${userId}`);

            if (response.status >= 200 && response.status < 300) {
                // Filter out the book with the specified ID from the local state if the delete was successful
                const updatedUsers = users.filter(user => user.id !== userId);
                // Update the state
                setUsers(updatedUsers);
                toast.success('User banned successfully');
            } else {
                // Handle any errors, e.g., show a message to the user
                console.error('Failed to ban the user');
            }
        } catch (error) {
            console.error('Failed to ban the user ', error);
        }
    };


    return (
        <>
            <Toaster />
            <div className="grid min-h-screen w-full lg:grid-cols-[280px_1fr]">
                <div className="hidden border-r bg-muted/40 lg:block">
                    <div className="flex h-full max-h-screen flex-col gap-2">
                        <div className="flex h-[60px] items-center border-b px-6">
                            <Link href="#" className="flex items-center gap-2 font-semibold" prefetch={false}>
                                <Package2Icon className="h-6 w-6" />
                                <span>Admin Panel</span>
                            </Link>
                        </div>
                        <div className="flex-1 overflow-auto py-2">
                            <nav className="grid items-start px-4 text-sm font-medium">
                                <button
                                    onClick={() => setSelectedSection("books")}
                                    className={`flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary ${selectedSection === "books" ? "text-primary" : ""}`}
                                >
                                    <BookIcon className="h-4 w-4" />
                                    Novels
                                </button>
                                <button
                                    onClick={() => setSelectedSection("users")}
                                    className={`flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary ${selectedSection === "users" ? "text-primary" : ""}`}
                                >
                                    <UsersIcon className="h-4 w-4" />
                                    Users
                                </button>
                            </nav>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col">
                    <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
                        {selectedSection === "books" && (
                            <div>
                                <div className="border shadow-sm rounded-lg">
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>Title</TableHead>
                                                <TableHead>Author</TableHead>
                                                <TableHead>Publication Date</TableHead>
                                                <TableHead>Actions</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {books.map((book) => (
                                                <TableRow key={book._id}> {/* Ensure you have a key here for each row */}
                                                    <TableCell className="font-medium">{book.title}</TableCell>
                                                    <TableCell>{book.author}</TableCell>
                                                    <TableCell><CalendarTodayIcon className="mr-2" />{format(new Date(book.createdAt), 'MMMM d, yyyy')}</TableCell>
                                                    <TableCell>
                                                        <Button onClick={() => handleDeleteBook(book._id)} variant="ghost" size="icon" className="rounded-full">
                                                            <Trash2Icon className="h-4 w-4" />
                                                        </Button>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </div>
                            </div>
                        )}
                        {selectedSection === "users" && (
                            <div>
                                <div className="border shadow-sm rounded-lg">
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>Name</TableHead>
                                                <TableHead>Username</TableHead>
                                                <TableHead>Email</TableHead>
                                                <TableHead>Role</TableHead>
                                                <TableHead>Actions</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {users.map((user) => (
                                                <TableRow key={user.id}>
                                                    <TableCell className="font-medium">{`${user.firstName} ${user.lastName}`}</TableCell>
                                                    <TableCell> {user.username} </TableCell>
                                                    <TableCell>{user.emailAddresses[0]?.emailAddress}</TableCell>
                                                    <TableCell>{user.publicMetadata.role ? 'Admin' : 'User'}</TableCell>
                                                    <TableCell className="text-right">
                                                        <Button onClick={() => handleUserBan(user.id)} variant="outline" size="sm" className="rounded-full">
                                                            Ban
                                                        </Button>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </div>
                            </div>
                        )}
                    </main>
                </div>
            </div>
        </>
    );
}


function BanIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <circle cx="12" cy="12" r="10" />
            <path d="m4.9 4.9 14.2 14.2" />
        </svg>
    )
}


function BookIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
        </svg>
    )
}


function Package2Icon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z" />
            <path d="m3 9 2.45-4.9A2 2 0 0 1 7.24 3h9.52a2 2 0 0 1 1.8 1.1L21 9" />
            <path d="M12 3v6" />
        </svg>
    )
}


function Trash2Icon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M3 6h18" />
            <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
            <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
            <line x1="10" x2="10" y1="11" y2="17" />
            <line x1="14" x2="14" y1="11" y2="17" />
        </svg>
    )
}


function UsersIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
    )
}