import { NextResponse } from 'next/server';
import connectDB from '@/utils/connect';
import Book from '@/models/book';



// Ensure the database is connected
connectDB();

export async function GET(req: Request) {
    if (req.method === 'GET') {


        try {
            const reqURL = new URL(req.url);
            const segments = reqURL.pathname.split('/');

            /*    const book = await Book.findById(id); */
            const bookId = segments.pop();
            const book = await Book.findById(bookId);
            return NextResponse.json(book)
        } catch (error) {
            return NextResponse.json({ error: 'Server error' }, { status: 500 });
        }
    }
}
