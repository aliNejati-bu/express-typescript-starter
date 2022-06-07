import {Container} from "inversify";
import * as Types from "../App/Intefaces/Types"
import {ConsoleLoggerService} from "../App/ConsoleLoggerService";
import {ILoggerService} from "../App/Intefaces/LoggerService/ILoggerService";

const container = new Container();

// bind the interface to the implementation
container.bind<ILoggerService>(Types.LoggerService).to(ConsoleLoggerService);
