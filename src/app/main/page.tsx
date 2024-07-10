"use client";

import { delay } from "framer-motion";
import Main from "../components/app/Main";


import { useRouter } from "next/navigation";
import { Toaster, toast } from "react-hot-toast";
import AppNavbar from "../components/app/AppNavbar";
import { useAuth } from "@clerk/nextjs";
import { useState } from "react";

const MainApp = () => {
    const { userId } = useAuth();



    return (<div>
        <Toaster />
        <div className="bg-black bg-opacity-95 backdrop-blur-lg ">
            <AppNavbar />
            <Main />
        </div>
    </div>);
}

export default MainApp;