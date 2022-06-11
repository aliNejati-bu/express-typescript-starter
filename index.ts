// import reflect metadata for inversify
import 'reflect-metadata';
import {run} from "./src";
import {container} from "./src/Container";
import {DataTypes} from "./src/Data/Interfaces/Types/DataTypes";
import {IDatabaseService} from "./src/Data/Interfaces/IDatabaseService";
import {config} from "dotenv";
config();
// connect to database
container.get<IDatabaseService>(DataTypes.IDatabaseService).connect()
    .then(() => {
        // run the server
        run(process.env.PORT as any || 3000, process.env.HOST || 'localhost').catch(err => {
                console.error(err);
                process.exit(1);
            }
        );
    }).catch(err => {
        console.log(err);
    }
);



