
"use client";

import { DropdownMenuTrigger, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuContent, DropdownMenu } from "@/components/ui/dropdown-menu"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import Link from "next/link";
import { Input } from "@/components/ui/input"
import SearchIcon from '@mui/icons-material/Search';
import { signOut } from "next-auth/react";
import ProfileButton from "./ProfileButton";
const Profile = () => {
    return (
        <div className="flex items-center gap-4 ">
            <form className="relative ml-auto mr-3 ">
                <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <Input
                    className="bg-gray-800 hover:scale-110 rounded-md pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Search books..."
                    type="text"
                />
            </form>
            <ProfileButton />
        </div>


    );
}

export default Profile;