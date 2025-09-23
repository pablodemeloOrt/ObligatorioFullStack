import projectMongoRepository from "./mongo-repository/project-mongo-repository.mjs";
import { baseConstant } from "../constants/base-constant.mjs";
import "dotenv/config";

let projectRepository;

if (process.env.BASE_IN_USE == baseConstant.MONGO) {
    projectRepository = projectMongoRepository;
}


export default projectRepository;