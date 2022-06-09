// import inversify container
import {Container} from 'inversify';
import {ILoggerService} from '../App/Interfaces/LoggeService/ILoggerService';
import {ConsoleLoggerService} from '../App/Services/LoggerService/ConsoleLoggerService';
import {TYPES} from '../App/Interfaces/Types';
import {UserValidator} from "../Middleware/Validators/UserValidator";

// create new container default in singelton mode
let container = new Container({defaultScope: 'Singleton'});
container.bind<ILoggerService>(TYPES.ILoggerService).to(ConsoleLoggerService);

export {container};