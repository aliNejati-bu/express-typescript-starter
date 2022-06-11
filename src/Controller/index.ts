import {NextFunction, Request, Response} from "express";
import {Router} from "express";


const router = Router();


export class Controller {
    private basePath: string;

    constructor(basePath: string) {
        this.basePath = basePath
    }

    private action: Array<{
        path: string,
        methode: "get" | "post" | "put" | "delete",
        handler: (req: Request, res: Response, next?: NextFunction) => void,
        middlewares?: ((req: Request, res: Response, next?: NextFunction) => void)[]
    }> = []

    public addAction(
        path: string,
        methode: "get" | "post" | "put" | "delete",
        handler: (req: Request, res: Response, next?: NextFunction) => void,
        middlewares?: Array<(req: Request, res: Response, next?: NextFunction) => void>
    ): void {
        this.action.push({
            path:this.basePath + path,
            methode,
            handler: handler.bind(this),
            middlewares
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