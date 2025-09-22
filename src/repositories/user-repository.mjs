import userMongoRepository from "./mongo-repository/user-mongo-repository.mjs";
import { baseConstant } from "../constants/base-constant.mjs";
import "dotenv/config";

let userRepository;

if (process.env.BASE_IN_USE == baseConstant.MONGO) {
    userRepository = userMongoRepository;
}


export default userRepository;