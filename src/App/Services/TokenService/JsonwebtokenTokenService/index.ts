import {ITokenService} from "../../../Interfaces/TokenService/ITokenService";
import * as jwt from "jsonwebtoken"
import {BaseAppError} from "../../../Errors/BaseAppError";


export class JsonwebtokenTokenService implements ITokenService {


    async createToken(payload: any, secretKey: string, lifetime: number): Promise<string> {
        try {
            return jwt.sign(payload, secretKey, {expiresIn: lifetime});
        } catch (e) {
            throw new BaseAppError(e.message, e);
        }
    }

    async verifyToken<T>(token: string, secretKey: string): Promise<boolean | T> {
        try {
            return jwt.verify(token, secretKey) as T;
        } catch (e) {
            return false;
        }
    }


}