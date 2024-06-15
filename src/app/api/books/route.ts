import { NextResponse } from 'next/server';
import connectDB from '@/utils/connect';
import Book, { IBook } from '@/models/book';


export async function GET(req: Request) {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('_id');

    if (req.method === 'GET') {
        if (id) {
            try {
                const book = await Book.findById(id);
                if (!book) {
                    return NextResponse.json({ error: 'Book not found' }, { status: 404 });
                }
                return NextResponse.json(book);
            } catch (error) {
                return NextResponse.json({ error: 'Server error' }, { status: 500 });
            }
        } else {
            try {
                const books = await Book.find({});
                return NextResponse.json(books);
            } catch (error) {
                return NextResponse.json({ error: 'Server error' }, { status: 500 });
            }
        }
    } else {
        return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
    }
}



export async function POST(req: Request) {
    await connectDB();
    try {
        const body = await req.json();
        const { author, title, image, description, chapters, tags, rating } = body;

        if (!author || !title || !description || !Array.isArray(chapters) || chapters.length === 0 || !tags || !rating) {
            return NextResponse.json({ error: 'Please fill in all fields' }, { status: 400 });
        }

        // Validate each chapter in the chapters array
        for (const chapter of chapters) {
            if (!chapter.title || !chapter.content) {
                return NextResponse.json({ error: 'Each chapter must have a title and content' }, { status: 400 });
            }
        }

        const newBook: IBook = new Book({
            author,
            title,
            image,
            description,
            chapters, // Ensure chapters array includes title and content
            tags,
            rating,

        });

        await newBook.save();
        return NextResponse.json(newBook, { status: 201 });
    } catch (error) {
        console.error('Error creating book:', error);
        return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }
}
