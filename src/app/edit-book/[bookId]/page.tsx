"use client"
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AppNavbar from '@/app/components/app/AppNavbar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'react-hot-toast';
import ImageUpload from '@/app/components/inputs/ImageUpload';
interface IChapter {
    title: string;
    content: string;
}

interface IBook {
    _id: string;
    userId: string;
    author: string;
    title: string;
    image: string;
    description: string;
    chapters: IChapter[];
    tags: string[];
    rating: number;
    counter: number;
}
interface BookPageProps {
    params: {
        bookId: string; // Assuming `id` is of type string
    };
}
export default function EditBook({ params: { bookId } }: BookPageProps) {
    const router = useRouter();

    const [book, setBook] = useState<IBook | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (bookId) {
            fetchBook();
        }
    }, [bookId]);

    const fetchBook = async () => {
        setLoading(true);
        try {
            const response = await fetch(`/api/books/${bookId}`);
            if (!response.ok) {
                throw new Error('Failed to fetch book');
            }
            const data = await response.json();
            setBook(data);
        } catch (error) {
            console.error('Error fetching book:', error);
            toast.error('Failed to load book');
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setBook(prev => prev ? { ...prev, [name]: value } : null);
    };
    const handleImageChange = (value: string) => {
        setBook(prev => prev ? { ...prev, image: value } : null);
    };
    const handleChapterChange = (index: number, field: 'title' | 'content', value: string) => {
        setBook(prev => {
            if (!prev) return null;
            const newChapters = [...prev.chapters];
            newChapters[index] = { ...newChapters[index], [field]: value };
            return { ...prev, chapters: newChapters };
        });
    };

    const handleTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const tags = e.target.value.split(',').map(tag => tag.trim());
        setBook(prev => prev ? { ...prev, tags } : null);
    };

    const addChapter = () => {
        setBook(prev => {
            if (!prev) return null;
            return { ...prev, chapters: [...prev.chapters, { title: '', content: '' }] };
        });
    };

    const removeChapter = (index: number) => {
        setBook(prev => {
            if (!prev) return null;
            const newChapters = prev.chapters.filter((_, i) => i !== index);
            return { ...prev, chapters: newChapters };
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!book) return;

        try {
            const response = await fetch(`/api/books/${bookId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(book),
            });

            if (!response.ok) {
                throw new Error('Failed to update book');
            }

            toast.success('Book updated successfully');
            router.push('/mypublications');
        } catch (error) {
            console.error('Error updating book:', error);
            toast.error('Failed to update book');
        }
    };

    if (loading) {
        return (<div className="h-screen flex justify-center items-center bg-black">
            <svg fill='none' className="w-6 h-6 animate-spin text-white" viewBox="0 0 32 32" xmlns='http://www.w3.org/2000/svg'>
                <path clip-rule='evenodd' d='M15.165 8.53a.5.5 0 01-.404.58A7 7 0 1023 16a.5.5 0 011 0 8 8 0 11-9.416-7.874.5.5 0 01.58.404z' fill='currentColor' fill-rule='evenodd' />
            </svg>
            <div className="text-white">Loading ...</div>
        </div>);
    }

    if (!book) {
        return <div>Book not found</div>;
    }

    return (
        <div className="bg-black min-h-screen  text-white">
            <AppNavbar />
            <div className="container mx-auto px-4 py-8 w-[80vw]">
                <h1 className="text-3xl font-bold mb-6">Edit Book</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <Input
                        name="title"
                        value={book.title}
                        onChange={handleInputChange}
                        placeholder="Title"
                        className="bg-gray-700 text-white"
                    />
                    <Input
                        name="author"
                        value={book.author}
                        onChange={handleInputChange}
                        placeholder="Author"
                        className="bg-gray-700 text-white"
                    />
                    <Textarea
                        name="description"
                        value={book.description}
                        onChange={handleInputChange}
                        placeholder="Description"
                        className="bg-gray-700 text-white"
                    />
                    <div>
                        <label className="block text-sm font-medium mb-2">Book Cover</label>
                        <ImageUpload
                            value={book.image}
                            onChange={handleImageChange}
                        />
                    </div>
                    <Input
                        name="rating"
                        type="number"
                        value={book.rating}
                        onChange={handleInputChange}
                        placeholder="Rating"
                        min="0"
                        max="5"
                        step="0.1"
                        className="bg-gray-700 text-white"
                    />
                    <Input
                        name="tags"
                        value={book.tags.join(', ')}
                        onChange={handleTagsChange}
                        placeholder="Tags (comma-separated)"
                        className="bg-gray-700 text-white"
                    />

                    <div className="space-y-4">
                        <h2 className="text-xl font-bold">Chapters</h2>
                        {book.chapters.map((chapter, index) => (
                            <div key={index} className="space-y-2 p-4 bg-gray-800 rounded">
                                <Input
                                    value={chapter.title}
                                    onChange={(e) => handleChapterChange(index, 'title', e.target.value)}
                                    placeholder={`Chapter ${index + 1} Title`}
                                    className="bg-gray-700 text-white"
                                />
                                <Textarea
                                    value={chapter.content}
                                    onChange={(e) => handleChapterChange(index, 'content', e.target.value)}
                                    placeholder={`Chapter ${index + 1} Content`}
                                    className="bg-gray-700 text-white"
                                />
                                <Button
                                    type="button"
                                    onClick={() => removeChapter(index)}
                                    className="bg-red-500 hover:bg-red-600"
                                >
                                    Remove Chapter
                                </Button>
                            </div>
                        ))}
                        <Button
                            type="button"
                            onClick={addChapter}
                            className="bg-green-500 hover:bg-green-600"
                        >
                            Add Chapter
                        </Button>
                    </div>

                    <Button type="submit" className="bg-blue-500 hover:bg-blue-600">
                        Update Book
                    </Button>
                </form>
            </div>
        </div>
    );
}