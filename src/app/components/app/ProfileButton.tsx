"use client";
import { DropdownMenuTrigger, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuContent, DropdownMenu } from "@/components/ui/dropdown-menu"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { signOut } from "next-auth/react";
import Link from "next/link";
import { useClerk } from '@clerk/nextjs';


const ProfileButton = () => {
    const { signOut } = useClerk();

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button className="rounded-full" variant={"profile"}>
                        <Avatar className="w-8 h-8">
                            <AvatarImage alt="User Avatar" src="/placeholder-avatar.jpg" />
                            <AvatarFallback>JD</AvatarFallback>
                        </Avatar>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuItem>My Library</DropdownMenuItem>
                    <DropdownMenuItem>Settings</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem><button onClick={() => signOut({ redirectUrl: '/' })} > Logout</button>  </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu></>);
}

export default ProfileButton;