// import reflect metadata for inversify
import 'reflect-metadata';
import {run} from "./src";
import {container} from "./src/Container";


// run the server
run(process.env.PORT as any || 3000, process.env.HOST || 'localhost').catch(err => {
        console.error(err);
        process.exit(1);
    }
);

