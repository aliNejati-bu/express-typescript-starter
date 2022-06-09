import {Express} from "express";
import {router} from "./routerLogger";

export class Router {

    init(app: Express) {
        app.use(router);

    }

}

export default new Router();