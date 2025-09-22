import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
    title: { type: String, required: true },
    completed: { type: Boolean, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" }
}, {
    timestamps: true
})

export default todoSchema;