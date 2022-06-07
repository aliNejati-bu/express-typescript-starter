import {Container} from "inversify";
import {ConsoleLoggerService} from "../App/ConsoleLoggerService";
import {ILoggerService} from "../App/Intefaces/LoggerService/ILoggerService";

const container = new Container();

// bind the interface to the implementation
container.bind<ILoggerService>("ILoggerService").to(ConsoleLoggerService);