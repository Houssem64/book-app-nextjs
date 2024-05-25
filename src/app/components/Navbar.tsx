"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import PersonIcon from '@mui/icons-material/Person';
import { DrawerTrigger, DrawerTitle, DrawerHeader, DrawerContent, Drawer } from "@/components/ui/drawer"
const Navbar = () => {

    const [isMobile, setIsMobile] = useState(false);
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        // Check mobile on mount
        checkMobile();

        // Check mobile on resize
        window.addEventListener('resize', checkMobile);

        // Cleanup the event listener on unmount
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    return (
        <>
            <header className="flex items-center justify-between px-6 py-4  mx-auto bg-[#141414] text-white">
                <Link className="text-2xl font-bold" href="/">
                    BookWorm
                </Link>
                {!isMobile ? (<nav className="flex items-center space-x-6 ml-auto mr-6 lg:space-x-6 ">
                    <Link className="hover:underline " href="#">
                        Discover
                    </Link>
                    <Link className="hover:underline " href="#">
                        My Library
                    </Link>
                    <Link className="hover:underline" href="#">
                        Profile
                    </Link>
                    <Link href="/signup" >
                        <Button className="bg-[#e50914] hover:bg-[#950e15] px-2 py-2 w-30 rounded hover:scale-110 transition">Sign Up</Button>
                    </Link>
                    <Link href="/signin" >
                        <Button className="bg-[#e50914] hover:bg-[#950e15] py-2 w-30 rounded hover:scale-110 transition">Login</Button>
                    </Link>
                </nav>) : null}
                <div className="lg:hidden ">
                    <Drawer>
                        <DrawerTrigger asChild  >
                            <Button className="lg:hidden" size="icon" variant="ghost">
                                <MenuIcon className="h-6 w-6" />
                                <span className="sr-only">Toggle menu</span>
                            </Button>
                        </DrawerTrigger>
                        <DrawerContent>
                            <DrawerHeader>
                                <DrawerTitle>Menu</DrawerTitle>
                            </DrawerHeader>
                            <div className="grid gap-4 p-4 m-2">
                                <Link className="flex items-center gap-2 text-lg font-medium" href="#">
                                    <SearchIcon className="h-5 w-5" />
                                    Discover
                                </Link>
                                <Link className="flex items-center gap-2 text-lg font-medium" href="#">
                                    <LibraryBooksIcon className="h-5 w-5" />
                                    My Library
                                </Link>
                                <Link className="flex items-center gap-2 text-lg font-medium" href="#">
                                    <PersonIcon className="h-5 w-5" />
                                    Profile
                                </Link>
                                <Button className="bg-[#e50914] hover:bg-[#f40612] px-4 py-2 rounded">Sign Up</Button>
                            </div>
                        </DrawerContent>
                    </Drawer>
                </div>
            </header>

        </>
    );
}

export default Navbar;