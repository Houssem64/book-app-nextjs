import { NextResponse } from 'next/server';
import connectDB from '@/utils/connect';
import Book from '@/models/book';
import { toast } from 'react-hot-toast';
export async function GET(req: Request) {
    const { searchParams } = new URL(req.url)

    const id = searchParams.get('_id')
    if (req.method === 'GET') {
        if (id) {
            const book = await Book.findById(id);
            if (!book) {
                return NextResponse.json({ error: 'Book not found' }, { status: 404 });
            }
            return NextResponse.json(book);
        } else {
            const books = await Book.find({});
            return NextResponse.json(books);
        }
    } else {
        NextResponse.json({ error: 'not allowed' }, { status: 401 });
    }

}
export async function POST(req: Request) {
    try {
        await connectDB();
        const body = await req.json();
        const { author, title, image, description, content, tags, rating } = body;
        if (!author || !title || !image || !description || !content || !tags || !rating) {
            return NextResponse.json({ error: 'Please fill in all fields' }, { status: 400 });
        }
        const newBook = new Book({
            author,
            title,
            image,
            description,
            content,
            tags,
            rating,
        });
        await newBook.save();
        return NextResponse.json(newBook, { status: 201 });
    } catch (error) {
        // Log the error to the console for debugging purposes
        console.error("Failed to create new book:", error);

        // Display an error toast notification
        toast.error("Failed to create new book. Please try again.");

        // Return a server error response
        return NextResponse.json({ error: "Failed to create new book" }, { status: 500 });
    }
}









/* // pages/api/books.ts
import { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '@/utils/connect';
import Book from '@/models/book';


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await connectDB();

    if (req.method === 'GET') {
        try {
            const books = await Book.find({});
            res.status(200).json(books);
        } catch (error) {
            res.status(500).json({ error: 'Failed to fetch books' });
        }
    } else {
        res.status(405).json({ message: 'Method not allowed' });
    }
}
 */