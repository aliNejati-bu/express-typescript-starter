import {NextFunction, Request, Response} from "express";
import {Router} from "express";


const router = Router();


export class Controller {


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
            path,
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

    response(res, data = {}, message = "", token = undefined, status = "ok", statusCode = 200) {

        if (typeof res === 'undefined') {
            return new Error('response object is not set')
        }

        let response = {}
        if (typeof token === 'undefined') {

            response = {
                status,
                message,
                data,
            }

            res.status(statusCode).send(response)
            return
        }

        response = {
            status,
            message,
            data,
            token
        }

        res.status(statusCode).send(response)

    }
}