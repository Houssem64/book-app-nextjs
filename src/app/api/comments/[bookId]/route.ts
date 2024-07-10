
import connectDB from '@/utils/connect';
import Comment from '@/models/comments';
import { NextRequest, NextResponse } from 'next/server';


export async function GET(
    request: NextRequest,
    { params }: { params: { bookId: string } }
) {
    const bookId = params.bookId;

    await connectDB();

    try {
        const comments = await Comment.find({ bookId }).sort({ createdAt: -1 });
        return NextResponse.json({ success: true, data: comments });
    } catch (error) {
        return NextResponse.json({ success: false }, { status: 400 });
    }
}

export async function POST(
    request: NextRequest,
    { params }: { params: { bookId: string } }
) {
    const bookId = params.bookId;

    await connectDB();

    try {
        const body = await request.json();
        const comment = await Comment.create({ ...body, bookId });
        return NextResponse.json({ success: true, data: comment }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ success: false }, { status: 400 });
    }
}