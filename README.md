# Starter project for Express and TypeScript

This project is a ready structure for developing server projects in nodejs environment with typescript language and express framework.

## Routing
In this project, Routing is done in the same controller layer.

Controllers are defined as a contract in the `src/Controller/Controllers` folder.
All controllers inherit from the parent controller, and their constructors specify the basic routing when they call the parent constructor (as a parent constructor parameter)
```javascript
import {Controller} from "..";
import {NextFunction, Request, Response} from "express";  
import {baseResponse} from "../../helpers/functions";

class ExampleController extends Controller {  
    constructor() {  
	    // base router
        super("/test");  
  }  
  
    async testMethod(req: Request, res: Response, next?: NextFunction) {  
        return baseResponse(res, {}, "validation test", undefined, "ok", 200);  
  }  
}
```
   The controller file must include an instance of the controller class as `export default` with the help of an anonymous function.

The routes are introduced to the controller as actions in this anonymous function.
```javascript
export default function (): ExampleController {  
    const controller = new ExampleController();  
  
  // add method to actions  
  controller.addAction("/test", "get", controller.testMethod, []);  
  
 return controller;  
}
```
Finally, routes must be introduced to express somewhere.

```javascript
/**
/src/Router/api/v1/index.ts
*/
import {Router} from "express";  
import ExampleController from "../../../Controller/Controllers/ExampleController";  
import AuthController from "../../../Controller/Controllers/AuthController";  
import UserController from "../../../Controller/Controllers/UserController";  
import BusinessController from "../../../Controller/Controllers/BusinessController";  
import OperatorController from "../../../Controller/Controllers/OperatorController";  
  
  
const router = Router();  
  
router.use(ExampleController().setupActions());  
router.use(AuthController().setupActions())  
router.use(UserController().setupActions());  
router.use(BusinessController().setupActions());  
router.use(OperatorController().setupActions())  
export default router;
```


