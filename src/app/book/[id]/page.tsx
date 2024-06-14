"use client";
import { useEffect, useState } from "react";
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

interface BookPageProps {
  params: {
    id: string; // Assuming `id` is of type string
  };
}
interface Book {
  id: string;
  title: string;
  author: string;
  description: string;
  image: string;
  content: string;
}


export default function BookPage({ params: { id } }: BookPageProps) {
  const router = useRouter();
  /* const id = usePathname() */
  console.log(id);

  const [book, setBook] = useState<Book | null>(null);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        // Ensure that `id` only contains the ID of the book, not `book/ID`
        const bookId = id.replace('/book/', '');

        const response = await axios.get<Book>(`/api/books/${bookId}`);
        setBook(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    if (id) {
      fetchBook();
    }
  }, [id]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };


  return (
    <div className={darkMode ? 'dark-mode h-[100vh] w-[100vw]' : 'h-[100vh] w-[100vw]'}>
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
        <div>
          <ProfileButton />
          <button onClick={toggleDarkMode} className="mx-2">
            <LightIcon />
          </button>
        </div>
      </section>

      {book && (
        <Card className={darkMode ? 'dark-mode mx-[15vw] text-wrap' : 'mx-[15vw] text-wrap'}>
          <CardHeader>
            <CardTitle className="text-center text-3xl mb-1 font-bold">{book.title}</CardTitle>
            <CardDescription className="center small">{book.author}</CardDescription>
            <CardDescription className="center small">
              <Image src={book.image} alt={book.description} className="w-full my-5 h-[400px] object-cover" height={400} width={300} quality={100} />
            </CardDescription>
          </CardHeader>
          <CardContent>
            {book.content}
          </CardContent>
        </Card>
      )}

      <ToastContainer />
    </div>
  );
}
