"use client";

import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { ChangeEventHandler, FormEventHandler, useEffect, useState } from 'react';
import toast from "react-hot-toast";
import { signIn } from "next-auth/react";
import { useRouter } from 'next/navigation';

const SignInForm = () => {

    const router = useRouter();
    const [userInfo, setUserInfo] = useState({
        email: '',
        password: ''
    });
    const { email, password } = userInfo;

    const handleChange: ChangeEventHandler<HTMLInputElement> = ({ target }) => {
        const { name, value } = target;
        setUserInfo({
            ...userInfo,
            [name]: value
        });
    };

    const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
        event.preventDefault();

        const res = await signIn('credentials', {
            email,
            password,
            redirect: false
        });

        if (res?.ok) {
            toast.success('Logged in successfully');
            router.push('/app');
        } else if (res?.error) {
            toast.error(res.error);
        }
    };

    return (
        <div className="flex justify-center items-center h-[100vh] bg-[#141414] text-white">
            <div className="bg-[#1f1f1f] rounded-lg shadow-lg w-full max-w-md p-8">
                <h2 className="text-3xl font-bold mb-6 text-center">Login</h2>
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <label className="block text-sm font-medium text-gray-300" htmlFor="email">
                            Email
                        </label>
                        <input
                            className="bg-[#2b2b2b] border-none rounded-md px-4 py-2 w-full text-white focus:outline-none focus:ring-2 focus:ring-[#e50914]"
                            id="email"
                            name="email"
                            placeholder="Enter your email"
                            type="email"
                            onChange={handleChange}
                            value={email}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-300" htmlFor="password">
                            Password
                        </label>
                        <input
                            className="bg-[#2b2b2b] border-none rounded-md px-4 py-2 w-full text-white focus:outline-none focus:ring-2 focus:ring-[#e50914]"
                            id="password"
                            name="password"
                            placeholder="Enter your password"
                            type="password"
                            onChange={handleChange}
                            value={password}
                        />
                    </div>
                    <Button type="submit" className="bg-[#e50914] hover:bg-[#f40612] w-full py-2 rounded text-lg">Login</Button>
                </form>
                <div className="mt-6 text-center">
                    <p className="text-gray-300">
                        Don't have an account?
                        <Link className="text-[#e50914] hover:underline pl-2" href="/signup">
                            Register
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SignInForm;
