import {Router} from "express";
import api from "../index";
import ExampleController from "../../../Controller/Controllers/ExampleController";


const router = Router();

router.use(ExampleController().setupActions());


export default router;