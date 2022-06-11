import {IIDService} from "../../../Interfaces/IDService/IIDService";
import * as uuid from "uuid";
import {injectable} from "inversify";

@injectable()
export class UUIDService implements IIDService {
    public generate(): string {
        return uuid.v4();
    }
}