
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { DropdownMenuTrigger, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuContent, DropdownMenu } from "@/components/ui/dropdown-menu"
import { RadioGroupItem, RadioGroup } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import SearchIcon from '@mui/icons-material/Search';
import ProfileButton from "./ProfileButton"
import {
    ClerkProvider,
    SignedIn,
    SignedOut,
    SignInButton,
    UserButton,
} from "@clerk/nextjs";

const AppNavbar = () => {
    return (
        <SignedIn>
            <div className="flex flex-col pt-2">
                <header className="bg-none  text-white py-4 px-6 flex gap-2">
                    <div className="flex items-center ">
                        <Link className="text-2xl font-bold" href="/main">
                            BookWorm
                        </Link>

                    </div>
                    <div className="mr-0 ml-auto justify-center items-center">
                        <Link className=" bg-gray-600 rounded p-2 mr-2 " href="/cms" >Publish a Novel</Link>

                    </div>
                    <div>
                        <UserButton />
                    </div>
                </header>
            </div>
        </SignedIn>
    );
}

export default AppNavbar;