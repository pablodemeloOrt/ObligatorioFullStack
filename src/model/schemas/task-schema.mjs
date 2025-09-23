import mongoose from 'mongoose';
import { TaskStatus } from '../constants/task-status.enum.mjs';

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project' },
  asignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  status: {
    type: String,
    enum: Object.values(TaskStatus),   
    default: TaskStatus.BACKLOG
  },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Task', taskSchema);
