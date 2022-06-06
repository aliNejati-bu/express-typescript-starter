import {config} from "dotenv";
import express from "express";


const run = () => {
    // load .env config
    config();

    // get port And Server for run app
    const PORT = process.env.PORT ?? 80;
    const SERVER = process.env.SERVER ?? 'localhost';


    const app = express();




    app.listen(PORT as number, SERVER, () => {
        console.log(`App Run On: http://${SERVER}:${PORT}`);
    });


}

export default run;