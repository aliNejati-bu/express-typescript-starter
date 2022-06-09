// import inversify container
import { Container } from 'inversify';
import { ILoggerService } from '../App/Interfaces/LoggeService/ILoggerService';
import {ConsoleLoggerService} from '../App/Services/LoggerService/ConsoleLoggerService';
import {TYPES} from '../App/Interfaces/Types';

const container = new Container();
container.bind<ILoggerService>(TYPES.ILoggerService).to(ConsoleLoggerService);

export { container };