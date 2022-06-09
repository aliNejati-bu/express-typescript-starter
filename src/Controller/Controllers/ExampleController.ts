import {Controller} from "..";
import {NextFunction, Request, Response} from "express";

class ExampleController extends Controller {
    testMethod(req: Request, res: Response, next?: NextFunction) {
        this.response(res, {}, "", undefined, "ok", 200);
    }
}

export default function (): ExampleController {
    const controller = new ExampleController();

    // add method to actions
    controller.addAction("/test", "get", controller.testMethod);

    return controller;
}