"use client";

import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { ChangeEventHandler, FormEventHandler, useState } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';

const SignUp = () => {
    const router = useRouter();
    const [userInfo, setUserInfo] = useState({
        name: '',
        email: '',
        password: '',
    });
    const { name, email, password } = userInfo;

    const handleChange: ChangeEventHandler<HTMLInputElement> = ({ target }) => {
        const { name, value } = target;
        setUserInfo({ ...userInfo, [name]: value });
    };

    const handleSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
        event.preventDefault();
        const res = await fetch("/api/auth/users", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userInfo),
        });


        if (!res.ok) {
            const errorMessage = await res.text();
            console.error('Fetch error:', errorMessage);
            toast.error("Registration failed. Please try again." + errorMessage);
            return;
        }

        try {
            const data = await res.json();
            console.log(data);
            toast.success('Registration successful');
            router.push('/signin');
            // Perform any additional actions, like redirecting the user
            // Example: router.push('/signin');
        } catch (error) {
            console.error('JSON parsing error:', error);
            toast.error('An error occurred while registering.');
        }
    };

    return (
        <div className="flex justify-center items-center h-[100vh] bg-[#141414] text-white">
            <Toaster toastOptions={{
                duration: 5000,
                style: {
                    background: '#141414',
                    color: '#fff',
                },
            }} />
            <div className="bg-[#1f1f1f] rounded-lg shadow-lg w-full max-w-md p-8">
                <h2 className="text-3xl font-bold mb-6 text-center">Register</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-300" htmlFor="name">
                            Name
                        </label>
                        <input
                            onChange={handleChange}
                            className="bg-[#2b2b2b] border-none rounded-md px-4 py-2 w-full text-white focus:outline-none focus:ring-2 focus:ring-[#e50914]"
                            id="name"
                            name="name"
                            placeholder="Enter your name"
                            type="text"
                            value={name}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-300" htmlFor="email">
                            Email
                        </label>
                        <input
                            onChange={handleChange}
                            className="bg-[#2b2b2b] border-none rounded-md px-4 py-2 w-full text-white focus:outline-none focus:ring-2 focus:ring-[#e50914]"
                            id="email"
                            name="email"
                            placeholder="Enter your email"
                            type="email"
                            value={email}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-300" htmlFor="password">
                            Password
                        </label>
                        <input
                            onChange={handleChange}
                            className="bg-[#2b2b2b] border-none rounded-md px-4 py-2 w-full text-white focus:outline-none focus:ring-2 focus:ring-[#e50914]"
                            id="password"
                            name="password"
                            placeholder="Enter your password"
                            type="password"
                            value={password}
                        />
                    </div>
                    <Button type='submit' className="bg-[#e50914] hover:bg-[#f40612] w-full py-2 rounded text-lg">Register</Button>
                </form>
                <div className="mt-6 text-center">
                    <p className="text-gray-300">
                        Already have an account?{' '}
                        <Link className="text-[#e50914] hover:underline" href="/signin">
                            Login
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default SignUp;
