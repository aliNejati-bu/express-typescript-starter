import {IDatabaseService} from "../Interfaces/IDatabaseService";
import * as mongoose from "mongoose";
import {inject, injectable} from "inversify";
import {IUserRepository} from "../Interfaces/Repositories/IUserRepository";
import {DataTypes} from "../Interfaces/Types/DataTypes";

@injectable()
export class MongooseDatabaseService implements IDatabaseService {
    public async connect(): Promise<void> {
        // connect to mongoose
        await mongoose.connect(process.env.MONGO_URI ?? "mongodb://localhost:27017/avattech", {});
    }

    @inject(DataTypes.IUserRepository) userRepository: IUserRepository;
}