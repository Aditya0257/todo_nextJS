import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
        select: false,
        minLength: [6, "Password is too short!"],
    },
});

export const User = mongoose.models.User || mongoose.model('User', userSchema);
