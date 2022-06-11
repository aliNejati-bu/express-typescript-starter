// import inversify container
import {Container} from 'inversify';
import {ILoggerService} from '../Utils/Interfaces/LoggeService/ILoggerService';
import {ConsoleLoggerService} from '../App/Services/LoggerService/ConsoleLoggerService';
import {TYPES} from '../App/Interfaces/Types';
import {UserValidator} from "../Middleware/Validators/UserValidator";
import {BaseValidator} from "../Middleware/Validators/BaseValidator";
import {DataTypes} from "../Data/Interfaces/Types/DataTypes";
import {IDatabaseService} from "../Data/Interfaces/IDatabaseService";
import {MongooseDatabaseService} from "../Data/MongooseDatabaseService";
import {IUserRepository} from "../Data/Interfaces/Repositories/IUserRepository";
import {MongooseUserRepository} from "../Data/MongooseDatabaseService/Repository/MongooseUserRepository";
import {UtilsTypes} from "../Utils/Interfaces/Types/UtilsTypes";


// create new container default in singleton mode
let container = new Container({defaultScope: 'Singleton'});

// bind utils layer
container.bind<ILoggerService>(UtilsTypes.ILoggerService).to(ConsoleLoggerService);


// bind app services
container.bind<IDatabaseService>(DataTypes.IDatabaseService).to(MongooseDatabaseService);


// bind repositories
container.bind<IUserRepository>(DataTypes.IUserRepository).to(MongooseUserRepository)


// bind validator to container
container.bind<BaseValidator>(BaseValidator).to(BaseValidator);
container.bind<UserValidator>(UserValidator).to(UserValidator);


export {container};