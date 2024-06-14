import mongoose, { Document, Model, Schema } from 'mongoose';

interface IBook extends Document {
    _id: String;
    author: string;
    title: string;
    image: string;
    description: string;
    content: string;
    tags: string[];
    rating: number;
}

const BookSchema: Schema = new Schema({
    _id: String,
    author: { type: String, required: true },
    title: { type: String, required: true },
    image: { type: String, required: true },
    description: { type: String, required: true },
    content: { type: String, required: true },
    tags: { type: [String], required: true },
    rating: { type: Number, required: true },
});

const Book: Model<IBook> = mongoose.models.Book || mongoose.model<IBook>('Book', BookSchema);
export default Book;
