import * as express from "express"
import router from "./Router";
import {trace} from "joi";

const app = express();

export const run = async (PORT: number, HOST: string) => {

    app.use(express.json());

    app.use(express.urlencoded({extended: true}));

    router.init(app);

    app.listen(PORT, HOST, () => {
        console.log(`Server running on http://${HOST}:${PORT}`);
    });
}