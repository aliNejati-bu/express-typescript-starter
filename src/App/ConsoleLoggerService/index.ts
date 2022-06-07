import {ILoggerService} from "../Intefaces/LoggerService/ILoggerService";
import {injectable} from "inversify";

@injectable()
export class ConsoleLoggerService implements ILoggerService {
    log(...data: any[]): void {
        console.log(...data);
    }
}