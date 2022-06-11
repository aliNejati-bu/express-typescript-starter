import {inject, injectable} from "inversify";
import {DataTypes} from "../../Data/Interfaces/Types/DataTypes";
import {IUserRepository} from "../../Data/Interfaces/Repositories/IUserRepository";

@injectable()
export class Auth {
    constructor(
        @inject(DataTypes.IUserRepository) public userRepository: IUserRepository
    ) {
    }

    async createUser(name: string, email: string, password: string) {
        
    }
}