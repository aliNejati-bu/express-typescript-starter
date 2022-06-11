import {IUserRepository} from "../../Interfaces/Repositories/IUserRepository";
import {User} from "../../Entities/User";
import {BaseDataResult} from "../../Model/Result/BaseDataResult";
import MongooseUserModel from "../Model/MongooseUserModel";
import {injectable} from "inversify";

@injectable()
export class MongooseUserRepository implements IUserRepository {
    async create(user: User): Promise<BaseDataResult<User>> {
        try {
            const mongooseUser = new MongooseUserModel(user);
            const result = await mongooseUser.save();
            return new BaseDataResult<User>(result.toObject(), false);
        } catch (e) {
            return new BaseDataResult(null, true);
        }
    }
}