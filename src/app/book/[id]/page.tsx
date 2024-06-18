"use client";
import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";
import LightIcon from '@mui/icons-material/Light';
import ProfileButton from "@/app/components/app/ProfileButton";
import styles from './book.module.css';
import { useParams } from 'next/navigation'
import { UserButton } from "@/app/components/UserButton";

interface BookPageProps {
  params: {
    id: string; // Assuming `id` is of type string
  };
}
interface Chapter {
  title: string;
  content: string;
}

interface Book {
  id: string;
  title: string;
  author: string;
  description: string;
  image: string;
  chapters: Chapter[];


}


export default function BookPage({ params: { id } }: BookPageProps) {

  const [currentChapterIndex, setCurrentChapterIndex] = useState(0);
  const [book, setBook] = useState<Book | null>(null);
  const [darkMode, setDarkMode] = useState(false);
  const titleRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        // Ensure that `id` only contains the ID of the book, not `book/ID`
        const bookId = id.replace('/book/', '');

        const response = await axios.get<Book>(`/api/books/${bookId}`);
        setBook(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchBook();

  }, [id]);
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

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const goToNextChapter = () => {
    const chaptersLength = book?.chapters?.length ?? 0; // Provide a default value of 0 if undefined
    if (currentChapterIndex < chaptersLength - 1) {
      setCurrentChapterIndex(currentChapterIndex + 1);
      titleRef.current?.scrollIntoView({ behavior: "smooth" });
    }

  };
  const goToPreviousChapter = () => {
    if (currentChapterIndex > 0) {
      setCurrentChapterIndex(currentChapterIndex - 1);
      titleRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <div className={darkMode ? 'dark-mode h-full w-full ' : 'h-full w-full'}>
      <section className="flex w-[90%] mx-auto justify-between items-center pt-10 mb-10">
        <div className="text-2xl font-bold">
          <Link href="/main">
            <i style={{ fontSize: '20px', cursor: 'pointer' }} className="fas fa-chevron-left"></i>
          </Link>
        </div>
        <div className="align-center translate-x-10 rounded">
          <h2 className={darkMode ? "text-center px-4 py-2 text-red-600 uppercase text-3xl font-extrabold" : "text-center text-red-500 uppercase text-3xl font-extrabold"}>
            {book?.title}
          </h2>
        </div>
        <div className="flex items-center">
          <UserButton />
          <button onClick={toggleDarkMode} className="mx-2">
            <LightIcon />
          </button>
        </div>
      </section>

      {book && (
        <Card className={darkMode ? 'dark-mode mx-[15vw] bg-transparent text-wrap' : 'mx-[15vw] text-wrap'}>
          <CardHeader>
            <CardTitle className="text-center text-3xl mb-1 font-bold">{book.title}</CardTitle>
            <CardDescription className="center small">{book.author}</CardDescription>
            <CardDescription className="center small relative h-auto mx-auto w-[25vw]  flex items-center justify-center ">
              <div className="relative h-[90vh] mt-5  flex items-center justify-center">
                <Image src={book.image} alt={book.description} layout="fill" objectFit="cover" objectPosition="center" quality={100} />
              </div>
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/*       {
              (book.chapters as Chapter[]).map((chapter, index) => (
                <div key={index}>
                  <h2 className="text-2xl font-bold my-5 text-wrap text-center mx-auto">{chapter.title}</h2>
                  <p className="font-sans  leading-relaxed w-3/4 p-4 text-wrap text-ellipsis text-justify mx-auto ">{chapter.content}</p>
                </div>
              ))
            } */}
            <div ref={titleRef} key={currentChapterIndex}>
              <h2 className="text-2xl font-bold my-5 text-wrap text-center mx-auto">
                {book.chapters[currentChapterIndex].title}
              </h2>
              <p className="font-sans leading-relaxed w-3/4 p-4 text-wrap text-ellipsis text-justify mx-auto">
                {book.chapters[currentChapterIndex].content}
              </p>
            </div>
            <div className="flex justify-center space-x-4 mt-4">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={goToPreviousChapter}
                disabled={currentChapterIndex === 0}
              >
                Previous
              </button>
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={goToNextChapter}
                disabled={currentChapterIndex === book.chapters.length - 1}
              >
                Next
              </button>
            </div>
          </CardContent>
        </Card>
      )}

      <ToastContainer />
    </div>
  );
}
