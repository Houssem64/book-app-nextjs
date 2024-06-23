import { NextResponse } from 'next/server';
import connectDB from '@/utils/connect';
import Book from '@/models/book';



// Ensure the database is connected


export async function GET(req: Request) {
    if (req.method === 'GET') {

        await connectDB();
        try {
            const reqURL = new URL(req.url);
            const segments = reqURL.pathname.split('/');

            /*    const book = await Book.findById(id); */
            const bookId = segments.pop();
            const book = await Book.findById(bookId)
            await Book.updateOne({ _id: bookId }, { $inc: { counter: 1 } });

            return NextResponse.json(book)
        } catch (error) {
            return NextResponse.json({ error: 'Server error' }, { status: 500 });
        }
    }
}



export async function DELETE(req: Request) {
    if (req.method === 'DELETE') {

        await connectDB();
        try {
            const reqURL = new URL(req.url);
            const segments = reqURL.pathname.split('/');

            /*    const book = await Book.findById(id); */
            const bookId = segments.pop();
            const book = await Book.findByIdAndDelete(bookId)



            return new Response(JSON.stringify(book), { status: 200 });
        } catch (error) {
            return NextResponse.json({ error: 'Server error' }, { status: 500 });
        }
    }
}
