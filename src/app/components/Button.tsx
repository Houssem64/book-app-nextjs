import Link from "next/link";

const PublishButton = () => {
    return (
        <Link href="/cms" ><button className="
        mr-3
        group
        p-5
        cursor-pointer 
        relative  
        text-xl 
        font-normal 
        border-0 
        flex 
        items-center 
        justify-center
        bg-transparent
         text-red-500 
         h-auto  
         w-[170px]  
         overflow-hidden   
         transition-all
         duration-100  " >

            <span className="
        group-hover:w-full
        absolute 
        left-0 
        h-full 
        w-5 
        border-y
        border-l
         border-red-500
           transition-all
         duration-500">
            </span>

            <p className="group-hover:opacity-0 group-hover:translate-x-[-100%] absolute translate-x-0 transition-all
         duration-200">Publish A Novel</p>

            <span className="group-hover:translate-x-0  group-hover:opacity-100 absolute  translate-x-full opacity-0  transition-all duration-200">
                Go!
            </span>

            <span
                className="group-hover:w-full absolute right-0 h-full w-5  border-y border-r  border-red-500 transition-all duration-500">
            </span>

        </button >  </Link>);
}

export default PublishButton;