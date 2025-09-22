import todoMongoRepository from "./mongo-repository/todo-mongo-repository.mjs";
import "dotenv/config";
import { baseConstant } from "../constants/base-constant.mjs";

let todoRepository;

if (process.env.BASE_IN_USE == baseConstant.MONGO) {
    todoRepository = todoMongoRepository;
}


export default todoRepository;