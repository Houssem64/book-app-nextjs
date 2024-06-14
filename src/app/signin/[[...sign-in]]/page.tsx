import { SignIn } from "@clerk/nextjs";

export default function Page() {
    return (

        <div className="flex justify-center items-center h-[100vh] bg-[#141414] text-white">
            <div className="bg-[#1f1f1f] rounded-lg shadow-lg w-full max-w-md p-8">

                <SignIn />

            </div>
        </div>);
}