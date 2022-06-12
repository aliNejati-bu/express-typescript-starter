import {inject, injectable} from "inversify";
import {DataTypes} from "../../Data/Interfaces/Types/DataTypes";
import {IUserRepository} from "../../Data/Interfaces/Repositories/IUserRepository";
import {TYPES} from "../Interfaces/Types";
import {IIDService} from "../Interfaces/IDService/IIDService";
import {User} from "../../Data/Entities/User";
import {BaseAppResult} from "../Model/Result/BaseAppResult";
import {ResultStatus} from "../Model/Result/ResultStatus";
import {UtilsTypes} from "../../Utils/Interfaces/Types/UtilsTypes";
import {ILoggerService} from "../../Utils/Interfaces/LoggeService/ILoggerService";
import {ITokenService} from "../Interfaces/TokenService/ITokenService";
import {IPasswordService} from "../Interfaces/PasswordService/IPasswordService";

@injectable()
export class Auth {

    @inject(DataTypes.IUserRepository) public _userRepository: IUserRepository;
    @inject(TYPES.IIDService) public _idService: IIDService;
    @inject(UtilsTypes.ILoggerService) public _loggerService: ILoggerService;
    @inject(TYPES.ITokenService) public _tokenService: ITokenService
    @inject(TYPES.IPasswordService) public _passwordService: IPasswordService;


    async createUser(name: string, email: string, password: string): Promise<BaseAppResult<null | { id: string }>> {
        try {
            const userExists = await this._userRepository.findByEmail(email);


            if (!userExists.isError) {
                return new BaseAppResult<null | { id: string }>(null, true, "User already exists", ResultStatus.Duplicate);
            }
            const user = new User(
                this._idService.generate(),
                name,
                email,
                await this._passwordService.hash(password),
                new Date(),
                new Date()
            );

            const result = await this._userRepository.create(user);
            return new BaseAppResult<{ id: string } | null>(
                {
                    id: user._id
                },
                false,
                "user created.",
                ResultStatus.Success
            );
        } catch (e) {
            this._loggerService.error(e.originalError ? e.originalError.message : e.message);
            return new BaseAppResult<null | { id: string }>(null, true, "Error creating user", ResultStatus.Unknown);
        }
    }

    async getTokenByEmailAndPassword() {
    }
}