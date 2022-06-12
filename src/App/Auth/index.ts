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
import {AdminTokenPayload} from "../Entities/AdminTokenPayload";

@injectable()
export class Auth {

    @inject(DataTypes.IUserRepository) private _userRepository: IUserRepository;
    @inject(TYPES.IIDService) private _idService: IIDService;
    @inject(UtilsTypes.ILoggerService) private _loggerService: ILoggerService;
    @inject(TYPES.ITokenService) private _tokenService: ITokenService
    @inject(TYPES.IPasswordService) private _passwordService: IPasswordService;


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
            this._loggerService.error(e.originalError ? e.originalError : e);
            return new BaseAppResult<null | { id: string }>(null, true, "Error creating user", ResultStatus.Unknown);
        }
    }

    async getTokenByEmailAndPassword(email: string, password: string): Promise<BaseAppResult<null | { token: string, lifeTime: number }>> {
        try {

            // get user from repository
            let user = await this._userRepository.findByEmail(email);

            // check if user not exists login filed.
            if (user.isError) {
                return new BaseAppResult<{ token: string; lifeTime: number } | null>(
                    null,
                    true,
                    "Email and password not match.",
                    ResultStatus.NotMatch
                )
            }

            // in this step user exists now check user password from password service
            let passwordCheckResult = await this._passwordService.verify(password, user.data.password);

            // check if password not match return error
            if (!passwordCheckResult) {
                return new BaseAppResult<{ token: string; lifeTime: number } | null>(
                    null,
                    true,
                    "Email and password not match.",
                    ResultStatus.NotMatch
                )
            }

            // in this step password match now generate token

            // get token secret from environment
            let tokenSecret = process.env.TOKEN_SECRET;

            // check if token secret not exists return error
            if (!tokenSecret) {
                return new BaseAppResult<{ token: string; lifeTime: number } | null>(
                    null,
                    true,
                    "Token secret not exists.",
                    ResultStatus.Unknown
                )
            }

            // get token lifetime from environment
            let tokenLifeTime = process.env.TOKEN_LIFE_TIME ?? 86400;


            // generate token
            let token = await this._tokenService.createToken(new AdminTokenPayload(user.data._id,["admin"],user.data.email).toPlainObject(), tokenSecret, +tokenLifeTime);

            // return token
            return new BaseAppResult<{ token: string; lifeTime: number } | null>(
                {
                    token,
                    lifeTime: +tokenLifeTime
                },
                false,
                "Token Generated.",
                ResultStatus.Success
            );
        } catch (e) {
            this._loggerService.error(e.originalError ? e.originalError : e);
            return new BaseAppResult<{ token: string; lifeTime: number } | null>(null, true, "Error creating user.", ResultStatus.Unknown)
        }
    }
}