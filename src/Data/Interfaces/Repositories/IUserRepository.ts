import {User} from "../../Entities/User";
import {BaseDataResult} from "../../Model/Result/BaseDataResult";

export interface IUserRepository {

    create(user: User): Promise<BaseDataResult<User>>;

    findByEmail(email: string): Promise<BaseDataResult<User>>;
}