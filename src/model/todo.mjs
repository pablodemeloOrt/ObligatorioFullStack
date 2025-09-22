import mongoose from "mongoose";
import todoSchema from "./schemas/todo-schema.mjs";

const Todo = mongoose.model("Todo", todoSchema);

export default Todo;