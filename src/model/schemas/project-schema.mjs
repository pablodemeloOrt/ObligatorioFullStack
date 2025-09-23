import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema.Types;
const projectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  members: [{ type: ObjectId, ref: 'User' }],
  createdAt: { type: Date, default: Date.now }
});
export default projectSchema;