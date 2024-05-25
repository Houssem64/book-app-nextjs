/* import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "name is required"],
        unique: [true, "name already exists"]
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: [true, "Email already exists"]
    },
    password: {
        type: String,
        required: [true, "Password is required"],
    }
},

    {
        timestamps: true
    }

);
const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User; */

import { Model, models, model } from "mongoose";
import { Document, Schema } from "mongoose";
import bcrypt from "bcrypt";

interface UserDocument extends Document {
    _id: string;
    name: string;
    email: string;
    password: string;
}
interface Methods {
    comparePassword(password: string): Promise<boolean>;
}
const userSchema = new Schema<UserDocument, {}, Methods>({
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true, trim: true },
    password: { type: String, required: true }
});
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        throw error
    }
})
//Compare password method
userSchema.methods.comparePassword = async function (password) {
    try {
        return await bcrypt.compare(password, this.password);
    } catch (error) {
        throw error;
    }
}
const UserModel = models.User || model("User", userSchema);
export default UserModel as Model<UserDocument, {}, Methods>;