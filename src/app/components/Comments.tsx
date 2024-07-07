"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useUser } from "@clerk/nextjs";
import { format } from 'date-fns';

interface Comment {
    _id: string;
    author: string;
    content: string;
    createdAt: string;
}

interface CommentsProps {
    bookId: string;
}

const Comments: React.FC<CommentsProps> = ({ bookId }) => {
    const { user, isLoaded } = useUser();
    const [comments, setComments] = useState<Comment[]>([]);
    const [newComment, setNewComment] = useState({ content: '' });

    useEffect(() => {
        if (isLoaded) {
            fetchComments();
        }
    }, [bookId, isLoaded]);

    const fetchComments = async () => {
        try {
            const response = await axios.get(`/api/comments/${bookId}`);
            setComments(response.data.data);
        } catch (error) {
            console.error('Error fetching comments:', error);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) {
            alert('You must be logged in to post a comment.');
            return;
        }
        try {
            await axios.post(`/api/comments/${bookId}`, {
                author: user.username || user.firstName || 'Anonymous',
                content: newComment.content
            });
            setNewComment({ content: '' });
            fetchComments();
        } catch (error) {
            console.error('Error submitting comment:', error);
        }
    };

    if (!isLoaded) {
        return <div>Loading...</div>;
    }

    return (
        <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4">Comments</h2>
            {user ? (
                <form onSubmit={handleSubmit} className="mb-6">
                    <textarea
                        placeholder="Your comment"
                        value={newComment.content}
                        onChange={(e) => setNewComment({ content: e.target.value })}
                        className="w-full p-2 mb-2 border rounded text-black"
                        required
                    ></textarea>
                    <button type="submit" className="bg-white text-black px-4 py-2 rounded">
                        Submit Comment
                    </button>
                </form>
            ) : (
                <p className="mb-6">Please log in to post a comment.</p>
            )}
            <div>
                {comments.map((comment) => (
                    <div key={comment._id} className="mb-4 p-4 border rounded">
                        <p className="font-bold">{comment.author}</p>
                        <p>{comment.content}</p>
                        <p className="text-sm text-gray-500">
                            {format(new Date(comment.createdAt), 'MMMM d, yyyy HH:mm')}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Comments;