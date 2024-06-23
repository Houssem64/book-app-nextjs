import { clerkClient } from "@clerk/nextjs/server";

import { NextRequest } from "next/server";

export async function GET(req: Request) {
    if (req.method === 'GET') {
        try {
            const users = await clerkClient.users.getUserList()
            return new Response(JSON.stringify(users), { status: 200 });
        } catch (error) {
            return new Response(JSON.stringify({ error: 'Server error' }), { status: 500 });
        }
    }
}