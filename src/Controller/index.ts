import {NextFunction, Request, Response} from "express";
import {Router} from "express";
import {asyncWrapper} from "../helpers/functions";


const router = Router();


export class Controller {
    private readonly basePath: string;


    private action: Array<{
        path: string,
        methode: "get" | "post" | "put" | "delete",
        handler: (req: Request, res: Response, next?: NextFunction) => void,
        middlewares?: ((req: Request, res: Response, next?: NextFunction) => void)[]
    }>;

    constructor(basePath: string) {
        this.basePath = basePath
        this.action = []
    }

    public addAction(
        path: string,
        methode: "get" | "post" | "put" | "delete",
        handler: (req: Request, res: Response, next?: NextFunction) => void,
        middlewares?: Array<(req: Request, res: Response, next?: NextFunction) => void>
    ): void {
        this.action.push({
            path: this.basePath + path,
            methode,
            handler: asyncWrapper(handler.bind(this)),
            middlewares: middlewares ? middlewares.map(mid => asyncWrapper(mid)) : null
        })
    }

    public setupActions(): any {
        this.action.forEach(action => {
            switch (action.methode) {
                case "get":
                    router.get(action.path, action.middlewares ?? [], action.handler);
                    break;
                case "post":
                    router.post(action.path, action.middlewares ?? [], action.handler);
                    break;
                case "put":
                    router.put(action.path, action.middlewares ?? [], action.handler);
                    break;
                case "delete":
                    router.delete(action.path, action.middlewares ?? [], action.handler);
                    break;
            }
        })
        return router;
    }
}