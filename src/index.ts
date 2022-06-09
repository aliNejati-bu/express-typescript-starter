import express, * as express_test from "express"

const app = express ? express() : express_test();

export const run = async (PORT:number,HOST:string) => {
    app.listen(PORT,HOST,() => {
        console.log(`Server running on http://${HOST}:${PORT}`);
    });
}