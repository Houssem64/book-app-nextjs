import { NextRequest, NextResponse } from 'next/server';
import { currentUser } from '@clerk/nextjs/server';
import ConnectDB from '@/utils/connect';
import Library from '@/models/Library';
import Book from '@/models/book';

export async function POST(req: NextRequest) {
    try {
        await ConnectDB();

        const user = await currentUser();
        const userId = user?.id;

        if (!userId) {
            return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
        }

        const { bookId } = await req.json();
        if (!bookId) {
            return NextResponse.json({ message: 'Book ID is required' }, { status: 400 });
        }

        const existingBook = await Library.findOne({ userId, bookId });
        if (existingBook) {
            return NextResponse.json({ message: 'Book already in library' }, { status: 400 });
        }

        await Library.create({ userId, bookId });

        return NextResponse.json({ message: 'Book added to library successfully' }, { status: 200 });
    } catch (error) {
        console.error('Error adding book to library:', error);
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}

export async function GET(req: NextRequest) {
    try {
        await ConnectDB();


        const user = await currentUser();
        const userId = user?.id;
        if (!userId) {
            return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
        }

        const library = await Library.find({ userId }).populate('bookId');
        const books = library.map(item => item.bookId);

        return NextResponse.json(books);
    } catch (error) {
        console.error('Error fetching library:', error);
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest) {
    try {
        await ConnectDB();


        const user = await currentUser();
        const userId = user?.id;
        if (!userId) {
            return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
        }

        const { bookId } = await req.json();
        if (!bookId) {
            return NextResponse.json({ message: 'Book ID is required' }, { status: 400 });
        }

        await Library.deleteOne({ userId, bookId });

        return NextResponse.json({ message: 'Book removed from library successfully' }, { status: 200 });
    } catch (error) {
        console.error('Error removing book from library:', error);
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}