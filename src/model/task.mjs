import mongoose from "mongoose";
import taskSchema from "./schemas/task-schema.mjs";

const task = mongoose.model("Task", taskSchema);

export default task;