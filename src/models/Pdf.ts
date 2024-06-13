// models/Pdf.ts
import mongoose, { Document, Schema } from 'mongoose';

interface IPdf extends Document {
    filename: string;
    content: Buffer;
    contentType: string;
}

const PdfSchema: Schema = new mongoose.Schema({
    filename: {
        type: String,
        required: true,
    },
    content: {
        type: Buffer,
        required: true,
    },
    contentType: {
        type: String,
        required: true,
    },
});

const Pdf = mongoose.models.Pdf || mongoose.model<IPdf>('Pdf', PdfSchema);

export default Pdf;
export type { IPdf };
