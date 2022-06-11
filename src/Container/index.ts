// import inversify container
import {Container} from 'inversify';
import {ILoggerService} from '../App/Interfaces/LoggeService/ILoggerService';
import {ConsoleLoggerService} from '../App/Services/LoggerService/ConsoleLoggerService';
import {TYPES} from '../App/Interfaces/Types';
import {UserValidator} from "../Middleware/Validators/UserValidator";
import {BaseValidator} from "../Middleware/Validators/BaseValidator";
import {DataTypes} from "../Data/Interfaces/Types/DataTypes";
import {IDatabaseService} from "../Data/Interfaces/IDatabaseService";
import {MongooseDatabaseService} from "../Data/MongooseDatabaseService";


// create new container default in singleton mode
let container = new Container({defaultScope: 'Singleton'});
container.bind<ILoggerService>(TYPES.ILoggerService).to(ConsoleLoggerService);
container.bind<IDatabaseService>(DataTypes.IDatabaseService).to(MongooseDatabaseService);


// bind validator to container
container.bind<BaseValidator>(BaseValidator).to(BaseValidator);
container.bind<UserValidator>(UserValidator).to(UserValidator);


export {container};