import {Controller} from "../index";
import {Request, Response} from "express";
import {NextFunction} from "express/ts4.0";
import {Auth} from "../../App/Auth";
import {baseResponse} from "../../helpers/functions";
import {ResultStatus} from "../../App/Model/Result/ResultStatus";
import {UserValidator} from "../../Middleware/Validators/UserValidator";
import {wrapValidatorToMiddleware} from "../../Middleware/general";
import {container} from "../../Container";

export class AuthController extends Controller {

    constructor(
        private _auth: Auth,
        public _userValidator: UserValidator
    ) {

        super("/user");
    }

    async addUser(req: Request, res: Response, next: NextFunction) {
        const result = await this._auth.createUser(req.body.name, req.body.email, req.body.password);
        if (result.ResultStatus != ResultStatus.Success) {
            if (result.ResultStatus == ResultStatus.Duplicate) {
                return baseResponse(res, null, "User already exists", undefined, result.ResultStatus, 400);
            } else {
                return baseResponse(res, null, "Error creating user", undefined, result.ResultStatus, 500);
            }
        }
        return baseResponse(res, result.result, "User created.");
    }
}

export default function (): AuthController {
    const controller = new AuthController(
        container.get(Auth),
        container.get(UserValidator)
    );
    controller.addAction(
        "/",
        "post",
        controller.addUser,
        [
            wrapValidatorToMiddleware(controller._userValidator.createUser)
        ]
    );
    return controller;
}