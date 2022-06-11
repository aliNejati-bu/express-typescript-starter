import {inject, injectable} from "inversify";
import {DataTypes} from "../../Data/Interfaces/Types/DataTypes";
import {IUserRepository} from "../../Data/Interfaces/Repositories/IUserRepository";
import {TYPES} from "../Interfaces/Types";
import {IIDService} from "../Interfaces/IDService/IIDService";
import {User} from "../../Data/Entities/User";
import {BaseAppResult} from "../Model/Result/BaseAppResult";

@injectable()
export class Auth {
    constructor(
        @inject(DataTypes.IUserRepository) public userRepository: IUserRepository,
        @inject(TYPES.IIDService) public idService: IIDService
    ) {
    }

    async createUser(name: string, email: string, password: string): Promise<BaseAppResult<null | { id: string }>> {

        const userExists = await this.userRepository.findByEmail(email);

        if (userExists.isError) {
            return new BaseAppResult<null | { id: string }>(null, true, "User already exists");
        }
        const user = new User(
            this.idService.generate(),
            name,
            email,
            password,
            new Date(),
            new Date()
        );

        const result = await this.userRepository.create(user);
        return new BaseAppResult<{ id: string } | null>(
            {
                id: user._id
            },
            false,
            "user created."
        );
    }
}