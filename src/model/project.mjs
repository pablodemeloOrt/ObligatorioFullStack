import mongoose from "mongoose";
import projectSchema from "./schemas/project-schema.mjs";

const project = mongoose.model("Project", projectSchema);

export default project;