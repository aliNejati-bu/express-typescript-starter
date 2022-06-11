import {Router} from "express";
import api from "../index";
import ExampleController from "../../../Controller/Controllers/ExampleController";
import AuthController from "../../../Controller/Controllers/AuthController";


const router = Router();

router.use(ExampleController().setupActions());
router.use(AuthController().setupActions())

export default router;