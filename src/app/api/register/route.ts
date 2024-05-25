import bcrypt from "bcrypt";
import { NextResponse } from "next/server";
import User from "@/models/userModel";
import connect from "@/utils/connect";

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { email, name, password } = body;

        if (!email || !name || !password) {
            return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
        }

        // Connect to the database
        await connect();

        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return NextResponse.json({ message: 'User already exists' }, { status: 400 });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 12);

        // Create a new user
        const newUser = new User({ name, email, password: hashedPassword });

        // Save the user to the database
        await newUser.save();

        return NextResponse.json({ message: 'User created successfully' }, { status: 201 });
    } catch (error) {
        console.error(error);

        if (error instanceof Error) {
            return NextResponse.json({ message: 'Internal Server Error', error: error.message }, { status: 500 });
        } else {
            return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
        }
    }
}
