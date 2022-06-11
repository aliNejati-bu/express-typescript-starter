import {Controller} from "..";
import {NextFunction, Request, Response} from "express";
import {baseResponse} from "../../helpers/functions";
import {inject, injectable} from "inversify";
import {UserValidator} from "../../Middleware/Validators/UserValidator";
import {wrapValidatorToMiddleware} from "../../Middleware/general";
import {container} from "../../Container";
import {TYPES} from "../../App/Interfaces/Types";


class ExampleController extends Controller {


    testMethod(req: Request, res: Response, next?: NextFunction) {
        return baseResponse(res,container.get(TYPES.IIDService), "validation test", undefined, "ok", 200);
    }
}

export default function (): ExampleController {
    const controller = new ExampleController();

    // add method to actions
    controller.addAction("/test", "get", controller.testMethod, [

    ])
    ;

    return controller;
}