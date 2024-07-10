import { NextResponse } from 'next/server';
import connectDB from '@/utils/connect';
import Book, { IBook } from '@/models/book';
import { currentUser } from '@clerk/nextjs/server';


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

export async function PUT(req: Request) {
    await connectDB();
    const user = await currentUser();
    const userId = user?.id;
    try {

        if (!userId) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const reqURL = new URL(req.url);
        const segments = reqURL.pathname.split('/');
        const bookId = segments.pop();

        const body = await req.json();
        const { author, title, image, description, chapters, tags, rating } = body;

        const updateData: Partial<IBook> = {
            author,
            title,
            image,
            description,
            chapters,
            tags,
            rating
        };

        const updatedBook = await Book.findOneAndUpdate(
            { _id: bookId, userId },
            updateData,
            { new: true, runValidators: true }
        );

        if (!updatedBook) {
            return NextResponse.json({ error: 'Book not found' }, { status: 404 });
        }

        return NextResponse.json(updatedBook);
    } catch (error) {
        console.error('Error updating book:', error);
        return NextResponse.json({ error: 'Server error' }, { status: 500 });
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
