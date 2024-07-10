import { clerkClient } from "@clerk/nextjs/server";

import { NextRequest } from "next/server";

export async function POST(req: Request) {
    if (req.method === 'POST') {
        try {
            const reqURL = new URL(req.url);
            const segments = reqURL.pathname.split('/');

            /*    const book = await Book.findById(id); */
            const userId = segments.pop();

            if (typeof userId === 'undefined') {
                return new Response(JSON.stringify({ error: 'User ID is undefined' }), { status: 400 });
            }
            const users = await clerkClient.users.deleteUser(userId)
            return new Response(JSON.stringify(users), { status: 200 });
        } catch (error) {
            return new Response(JSON.stringify({ error: 'Server error' }), { status: 500 });
        }
    }
}