import { NextResponse } from 'next/server';
import connectDB from '@/utils/connect';
import UserModel from '@/models/userModel';
interface NewUserRequest {
    name: string;
    email: string;
    password: string;
}
interface NewUserResponse {
    id: string;
    name: string;
    email: string;


}
type NewResponse = NextResponse<{ user?: NewUserResponse; error?: string }>;
export const POST = async (req: Request): Promise<NewResponse> => {
    const body = (await req.json()) as NewUserRequest;
    await connectDB();
    const oldUser = await UserModel.findOne({ email: body.email });
    if (oldUser) {
        return NextResponse.json({ error: "User already exists" }, { status: 422 });

    }
    const user = await UserModel.create({ ...body });
    return NextResponse.json({ user: { id: user._id, name: user.name, email: user.email } });
}