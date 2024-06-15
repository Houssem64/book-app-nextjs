"use client";
// pages/create-book.tsx
import { useState } from 'react';
import axios from 'axios';
import ImageUpload from '../components/inputs/ImageUpload';
import { toast } from 'react-hot-toast';
import { Toaster } from 'react-hot-toast';


const CreateBook = () => {
    const [book, setBook] = useState({
        author: '',
        title: '',
        image: '',
        description: '',
        chapters: [{ title: '', content: '' }],
        tags: '',
        rating: 0,
    });

    const handleChapterChange = (index: number, e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        const newChapters = [...book.chapters];
        newChapters[index] = { ...newChapters[index], [name]: value };
        setBook({ ...book, chapters: newChapters });
    };

    const addChapter = () => {
        setBook((prevBook) => ({
            ...prevBook,
            chapters: [...prevBook.chapters, { title: '', content: '' }],
        }));
    };

    const removeChapter = (index: number) => {
        setBook((prevBook) => ({
            ...prevBook,
            chapters: prevBook.chapters.filter((_, i) => i !== index),
        }));
    };


    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setBook((prevBook) => ({
            ...prevBook,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/books', book);
            if (response.status === 201) {
                toast.success('Book created successfully');
            }
        } catch (err) {
            if (axios.isAxiosError(err) && err.response) {
                if (err.response.status === 400) {
                    toast.error('Please fill in all fields');
                } else {
                    // Extracting the error message from the response, if available
                    const errorMessage = err.response.data.message || 'An error occurred';
                    toast.error(`Error: ${errorMessage}`);
                }
            } else {
                toast.error('An unknown error occurred');
            }
        }
    };

    return (
        <>
            <Toaster />
            <div className='w-full h-full bg-black'>
                <div className="max-w-2xl mx-auto p-6 border border-gray-300 rounded-lg shadow-md">
                    <h1 className="text-2xl font-bold text-white text-center mb-6">Create a New Book</h1>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="flex flex-col">
                            <label className="mb-2 font-medium text-white">Author:</label>
                            <input
                                type="text"
                                name="author"
                                value={book.author}
                                onChange={handleChange}
                                className="p-2 border border-gray-300 rounded-md bg-transparent cursor-text caret-white text-white"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label className="mb-2 font-medium text-white">Title:</label>
                            <input
                                type="text"
                                name="title"
                                value={book.title}
                                onChange={handleChange}
                                className="p-2 border border-gray-300 rounded-md  bg-transparent cursor-text caret-white text-white"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label className="mb-2 font-medium text-white">Upload Image</label>
                            <ImageUpload value={book.image} onChange={(value) => setBook({ ...book, image: value })} />
                        </div>
                        <div className="flex flex-col">
                            <label className="mb-2 font-medium text-white">Description:</label>
                            <textarea
                                name="description"
                                value={book.description}
                                onChange={handleChange}
                                className="p-2 border border-gray-300 rounded-md bg-transparent cursor-text caret-white text-white "
                            />
                        </div>
                        <div className="flex flex-col">
                            <label className="mb-2 font-medium text-white">Chapters:</label>
                            {book.chapters.map((chapter, index) => (
                                <div key={index} className="space-y-2">
                                    <input
                                        type="text"
                                        name="title"
                                        placeholder={`Chapter ${index + 1} Title`}
                                        value={chapter.title}
                                        onChange={(e) => handleChapterChange(index, e)}
                                        className="p-2 border border-gray-300 rounded-md bg-transparent  cursor-text caret-white text-white"
                                    />
                                    <br></br>
                                    <textarea
                                        name="content"
                                        placeholder={`Chapter ${index + 1} Content`}
                                        value={chapter.content}
                                        onChange={(e) => handleChapterChange(index, e)}
                                        className="p-2 border  border-gray-300 rounded-md bg-transparent cursor-text h-[200px] col-span-4 w-full caret-white text-white"
                                    />
                                    <button type="button" onClick={() => removeChapter(index)} className="text-red-500 mb-4 pb-4">
                                        Remove Chapter
                                    </button>
                                </div>
                            ))}
                            <button type="button" onClick={addChapter} className="px-4 py-2 bg-white text-black font-semibold rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400">
                                Add Chapter
                            </button>
                        </div>
                        <div className="flex flex-col">
                            <label className="mb-2 font-medium text-white">Tags (comma separated):</label>
                            <input
                                type="text"
                                name="tags"
                                value={book.tags}
                                onChange={handleChange}
                                className="p-2 border border-gray-300 rounded-md  bg-transparent cursor-text caret-white text-white"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label className="mb-2 font-medium text-white">Rating:</label>
                            <input
                                type="number"
                                name="rating"
                                value={book.rating}
                                onChange={handleChange}
                                min="0"
                                max="5"
                                className="p-2 border border-gray-300 rounded-md  bg-transparent cursor-text caret-white text-white"
                            />
                        </div>
                        <div></div>
                        <button type="submit" className="px-4 py-2 bg-white text-black font-semibold rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400">
                            Create Book
                        </button>
                    </form>
                </div>
            </div>
        </>
    );

}
export default CreateBook;

/* import { useState } from 'react';
import axios from 'axios';

interface FormData {
    author: string;
    title: string;
    image: string;
    description: string;
    content: string;
    tags: string;
    rating: number;
    [key: string]: string | number; // Index signature allowing dynamic property access
}

interface FormErrors {
    [key: string]: string;
}

type FormField = {
    name: string;
    label: string;
    type: string;
    min?: number;
    max?: number;
};

const CreateBook = () => {
    const [formData, setFormData] = useState<FormData>({
        author: '',
        title: '',
        image: '',
        description: '',
        content: '',
        tags: '',
        rating: 0,
    });

    const [errors, setErrors] = useState<FormErrors>({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const validateForm = () => {
        const newErrors: FormErrors = {};
        Object.keys(formData).forEach(key => {
            if (!formData[key as keyof FormData]) {
                newErrors[key] = `${key} is required`;
            }
        });
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            await axios.post('/api/books', {
                ...formData,
                tags: formData.tags.split(',').map(tag => tag.trim()),
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    // Add more headers here if needed
                }
            });
            alert('Book created successfully');
        } catch (error) {
            alert('Failed to create book');
        }

    };

    return (
        <div className="max-w-2xl mx-auto p-6 border border-gray-300 rounded-lg shadow-md">
            <h1 className="text-2xl font-bold text-center mb-6">Create a New Book</h1>
            <form onSubmit={onSubmit} className="space-y-4">
                {formFields.map((field, index) => (
                    <div key={index} className="flex flex-col">
                        <label className="mb-2 font-medium text-gray-700">{field.label}</label>
                        {field.type === 'textarea' ? (
                            <textarea
                                name={field.name}
                                value={formData[field.name]}
                                onChange={handleChange}
                                className="p-2 border border-gray-300 rounded-md"
                            />
                        ) : (
                            <input
                                type={field.type}
                                name={field.name}
                                value={formData[field.name] as string}
                                onChange={handleChange}
                                className="p-2 border border-gray-300 rounded-md"
                                min={field.min}
                                max={field.max}
                            />
                        )}
                        {errors[field.name] && (
                            <span className="text-red-500">{errors[field.name]}</span>
                        )}
                    </div>
                ))}
                <button type="submit" className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400">
                    Create Book
                </button>
            </form>
        </div>
    );
};

const formFields: FormField[] = [
    { label: 'Author:', name: 'author', type: 'text' },
    { label: 'Title:', name: 'title', type: 'text' },
    { label: 'Image URL:', name: 'image', type: 'text' },
    { label: 'Description:', name: 'description', type: 'textarea' },
    { label: 'Content:', name: 'content', type: 'textarea' },
    { label: 'Tags (comma separated):', name: 'tags', type: 'text' },
    { label: 'Rating:', name: 'rating', type: 'number', min: 0, max: 5 }
];

export default CreateBook;
 */