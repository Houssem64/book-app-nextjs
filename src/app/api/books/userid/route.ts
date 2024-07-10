import { NextResponse } from 'next/server';
import connectDB from '@/utils/connect';
import Book from '@/models/book';
import { currentUser } from '@clerk/nextjs/server';

export async function GET(req: Request) {
    await connectDB();
    const user = await currentUser();
    const userId = user?.id;
    try {


        if (!userId) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const books = await Book.find({ userId });
        return NextResponse.json(books);
    } catch (error) {
        return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }
}