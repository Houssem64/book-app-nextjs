"use client";
import { use, useEffect, useState } from "react";
import VisibilityIcon from '@mui/icons-material/Visibility';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import axios from "axios";
import { format } from 'date-fns';
import AppNavbar from "@/app/components/app/AppNavbar";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import StarIcon from '@mui/icons-material/Star';
import Counter from "@/app/components/Counter";
import { Toaster } from "react-hot-toast";

import { useRouter } from "next/navigation";
import DisqusComments from "@/app/components/Comments";

interface BookPageProps {
  params: {
    id: string; // Assuming `id` is of type string
  };
}
interface Book {
  _id: number;
  title: string;
  image: string;
  description: string;
  author: string;
  chapters: [{ title: string; content: string; }];
  tags: string[];
  rating: number;
  counter: number;
  // Add more fields if needed
}


export default function BookPage({ params: { id } }: BookPageProps) {

  const router = useRouter();
  const [book, setBook] = useState<Book | null>(null);
  const [darkMode, setDarkMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [ChapterCount, setChapterCount] = useState(0);
  useEffect(() => {
    const fetchBook = async () => {

      try {
        const response = await axios.get<Book>(`/api/books/${id}`);
        setBook(response.data);

        setLoading(false);

      } catch (error) {
        console.error(error);
      }

    };

    if (id) {
      fetchBook();
    }
  }, []);
  useEffect(() => {
    if (book?.chapters) {
      const ChapterCount = book.chapters.reduce((count, chapter) => {
        let matchArray = chapter.title.match(/Chapter/gi); // 'gi' for global, case-insensitive
        return count + (matchArray ? matchArray.length : 0);
      }, 0);
      setChapterCount(ChapterCount);
    }
  }, [book]);
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };
  if (loading) {
    return (
      <div className="h-screen flex justify-center items-center bg-black">
        <svg fill='none' className="w-6 h-6 animate-spin text-white" viewBox="0 0 32 32" xmlns='http://www.w3.org/2000/svg'>
          <path clip-rule='evenodd'
            d='M15.165 8.53a.5.5 0 01-.404.58A7 7 0 1023 16a.5.5 0 011 0 8 8 0 11-9.416-7.874.5.5 0 01.58.404z'
            fill='currentColor' fill-rule='evenodd' />
        </svg>


        <div className="text-white">Loading ...</div>
      </div>
    );
  }
  const splitFirstTag = book?.tags[0].split(' ') || [];
  const formattedDate = format(new Date("2024-06-15T03:51:25.387+00:00"), 'MMMM d, yyyy');

  return (
    <>
      <Toaster />
      <div className="h-[100vh] w-[99vw] bg-black ">
        <AppNavbar />
        <div className="flex justify-center items-center gap-8 p-8">
          <div className="w-[350px]">
            <img src={book?.image} alt="1984 by George Orwell" className="w-full aspect-[3/4] object-cover rounded-md" />
            <div className="flex justify-between items-center mt-4">

            </div>
          </div>
          <div className="flex flex-col gap-4 max-w-md">
            <h1 className="text-3xl font-bold text-white">{book?.title} </h1>
            <p className="text-sm text-gray-400">{book?.author} </p>
            <div className="flex items-center gap-2">

              <div className="flex items-center gap-1 ">
                <Badge className="text-sm">Rating :</Badge>
                {[...Array(5)].map((_, i) => (
                  <StarIcon key={i} className={book && i < book.rating ? "text-yellow-500" : "text-gray-400 dark:text-gray-600"} />
                ))}
              </div>

            </div>
            <div className="flex gap-2 text-white">
              {splitFirstTag.map((tag, index) => (
                <Badge key={index}>{tag}</Badge>
              ))}

            </div>
            <p className="text-sm text-white">Language: English</p>
            <Badge className="text-sm "><CalendarTodayIcon className="mr-2" /> Published  At: {formattedDate} </Badge>
            <Button className="w-full bg-white text-black" onClick={() => router.push(`/book/${book?._id}`)} >Read Now</Button>
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-white">Book Description</h2>
              <p className="text-sm text-gray-300 ">{book?.description} </p>
              <div className="space-x-2">

                <Badge className="text-sm "><VisibilityIcon className="mr-2" />  Views:  {book?.counter} </Badge>
                <Badge className="text-sm "><MenuBookIcon className=" mr-2" />  Chapters:  {ChapterCount} </Badge>
              </div>
            </div>
            <Counter />
          </div>

        </div>



      </div>
      <div className="w-full p-10 bg-black text-white  h-full  justify-center items-center mx-auto">
        <DisqusComments book={book} />
      </div>
    </>
  );
}
