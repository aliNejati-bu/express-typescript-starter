import express from "express"

let expressRouter = express.Router();

export class Router {
    public init() {
        expressRouter.get("/test",(req,res)=>{
            res.send("ok");
        })
        return expressRouter;
    }
}

export let router = new Router();