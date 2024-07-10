import mongoose from 'mongoose';

const LibrarySchema = new mongoose.Schema({
    userId: { type: String, required: true }, // Clerk user ID
    bookId: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true },
}, { timestamps: true });

LibrarySchema.index({ userId: 1, bookId: 1 }, { unique: true });

export default mongoose.models.Library || mongoose.model('Library', LibrarySchema);