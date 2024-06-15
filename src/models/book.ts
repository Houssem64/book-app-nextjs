import mongoose, { Document, Model, Schema } from 'mongoose';

export interface IChapter extends Document {
    title: string;
    content: string;
}

export interface IBook extends Document {
    author: string;
    title: string;
    image: string;
    description: string;
    chapters: IChapter[];
    tags: string[];
    rating: number;
    counter: number;

}

const ChapterSchema: Schema = new Schema({
    title: { type: String, required: true },
    content: String
});

const BookSchema: Schema = new Schema({
    author: { type: String, required: true },
    title: { type: String, required: true },
    image: { type: String, default: 'https://via.placeholder.com/150' },
    description: { type: String, required: true },
    chapters: { type: [ChapterSchema], required: true },
    tags: { type: [String], required: true },
    rating: { type: Number, required: true },
    counter: { type: Number, default: 0 }, // Default counter value

}, {
    timestamps: true
});

const Book: Model<IBook> = mongoose.models.Book || mongoose.model<IBook>('Book', BookSchema);
export default Book;
