import {IDatabaseService} from "../Interfaces/IDatabaseService";
import * as mongoose from "mongoose";
import {injectable} from "inversify";

@injectable()
export class MongooseDatabaseService implements IDatabaseService {
    public async connect(): Promise<void> {
        // connect to mongoose
        await mongoose.connect(process.env.MONGO_URI ?? "mongodb://localhost:27017/avattech", {});
    }
}