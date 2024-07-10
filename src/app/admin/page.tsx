
import { checkRole } from "@/utils/roles";
import toast from "react-hot-toast";
import Link from "next/link";

import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import AdminDashboardClient from "../components/admin/AdminDashboardClient";




export default function AdminDashboard() {


    // If the user does not have the admin role, redirect them to the home page
    if (!checkRole("admin")) {

        return (<div className="flex justify-center items-center text-center h-screen w-screen text-red-500">
            <div className="flex flex-col items-center space-y-4">
                <span className="p-4 font-extrabold bg-white rounded-md shadow-md">UNAUTHORIZED ACCESS </span>
                <Link href="/main" className="p-4 font-extrabold bg-red-500 hover:scale-110 transition text-white rounded-md shadow-md">Go Home</Link>
            </div>
        </div>)

    }

    return (
        <>
            <AdminDashboardClient />
        </>
    );
}

