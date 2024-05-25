import Link from "next/link"
import { Input } from "@/components/ui/input"
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { DropdownMenuTrigger, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuContent, DropdownMenu } from "@/components/ui/dropdown-menu"
import { RadioGroupItem, RadioGroup } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import SearchIcon from '@mui/icons-material/Search';
import Profile from "./Profile"


const AppNavbar = () => {
    return (
        <div className="flex flex-col">
            <header className="bg-none  text-white py-4 px-6 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Link className="text-2xl font-bold" href="#">
                        BookWorm
                    </Link>

                </div>
                <Profile />
            </header>
        </div>
    );
}

export default AppNavbar;