import {IPasswordService} from "../../../Interfaces/PasswordService/IPasswordService";
import * as bcrypt from "bcrypt";
import {injectable} from "inversify";

@injectable()
export class BcryptPasswordService implements IPasswordService {
    async hash(password: string): Promise<string> {
        return await bcrypt.hash(password, 15);
    }

    async verify(password: string, hash: string): Promise<boolean> {
        return await bcrypt.compare(password, hash);
    }


}