import {IUserRepository} from "../../Interfaces/Repositories/IUserRepository";
import {User} from "../../Entities/User";
import {BaseDataResult} from "../../Model/Result/BaseDataResult";
import MongooseUserModel from "../Model/MongooseUserModel";
import {inject, injectable} from "inversify";
import {UtilsTypes} from "../../../Utils/Interfaces/Types/UtilsTypes";
import {ILoggerService} from "../../../Utils/Interfaces/LoggeService/ILoggerService";
import {BaseDataError} from "../../Errors/BaseDataError";

@injectable()
export class MongooseUserRepository implements IUserRepository {
    @inject(UtilsTypes.ILoggerService) private _loggerService: ILoggerService;

    async create(user: User): Promise<BaseDataResult<User>> {
        try {
            const mongooseUser = new MongooseUserModel(user);
            const result = await mongooseUser.save();
            return new BaseDataResult<User>(result.toObject(), false);
        } catch (e) {
            this._loggerService.error(e);
            throw new BaseDataError("Error while creating user");
        }
    }

    async findByEmail(email: string): Promise<BaseDataResult<User>> {
        try {
            const result = await MongooseUserModel.findOne({
                email
            });

            if (!result) {
                return new BaseDataResult(null, true);
            }

            return new BaseDataResult<User>(result.toObject(), false);
        } catch (e) {
            this._loggerService.error(e);
            throw new BaseDataError("Error while finding user");
        }
    }
}