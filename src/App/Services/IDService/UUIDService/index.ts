import {IIDService} from "../../../Interfaces/IDService/IIDService";
import * as uuid from "uuid";
export class UUIDService implements IIDService {
    public generate(): string {
        return uuid.v4();
    }
}