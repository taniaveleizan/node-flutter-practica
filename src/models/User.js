import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,},
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ["employee", "approver", "admin"],
        default: "employee"
    }
}, {timestamps: true});

const User = mongoose.model("User", UserSchema);
export default User;