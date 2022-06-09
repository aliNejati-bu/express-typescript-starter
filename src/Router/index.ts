import {Express} from "express";
import {router} from "./routerLogger";
import api from "./api";

export class Router {
    init(app: Express) {
        app.use(router);

        // api router
        app.use("/api", api);
    }
}

export default new Router();