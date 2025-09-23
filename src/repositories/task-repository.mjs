import taskMongoRepository from "./mongo-repository/task-mongo-repository.mjs";
import "dotenv/config";
import { baseConstant } from "../constants/base-constant.mjs";

let taskRepository;

if (process.env.BASE_IN_USE == baseConstant.MONGO) {
    taskRepository = taskMongoRepository;
}


export default taskRepository;