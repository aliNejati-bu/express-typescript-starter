import {ILoggerService} from "../../../../Utils/Interfaces/LoggeService/ILoggerService";
import {injectable} from "inversify";

@injectable()
export class ConsoleLoggerService implements ILoggerService {
    log(...data: any[]): void {
        console.log(...data);
    }

    error(...data: any[]): void {
        console.error(...data);
    }

    warn(...data: any[]): void {
        console.warn(...data);
    }

    info(...data: any[]): void {
        console.info(...data);
    }

    debug(...data: any[]): void {
        console.debug(...data);
    }
}