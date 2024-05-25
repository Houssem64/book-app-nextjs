"use client";

import { delay } from "framer-motion";
import Main from "../components/app/Main";
import { useSession } from "next-auth/react"

import { useRouter } from "next/navigation";
import { Toaster, toast } from "react-hot-toast";
import AppNavbar from "../components/app/AppNavbar";

const MainApp = () => {
    const session = useSession();
    const router = useRouter();

    if (session.status === "unauthenticated") {
        router.push("/");
        toast.error("Please login to continue")

    }

    return (<div>
        <Toaster />
        <div className="bg-black">
            <AppNavbar />
            <Main />
        </div>
    </div>);
}

export default MainApp;