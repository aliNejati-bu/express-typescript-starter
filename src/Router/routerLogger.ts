import {Router, Request, Response} from "express";

const router = Router();

router.get('*', (req: Request, res: Response, next: Function) => {
    console.log('')
    console.log('<-------------------------- GET Request -------------------------->')
    console.log(' GET request was made to: ' + req.originalUrl + " -> " + new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''))
    console.dir("   request params: " + JSON.stringify(req.params))
    console.log('IP: ', req.ip)
    console.log('')

    return next()
})

router.post('*', (req: Request, res: Response, next: Function) => {

    console.log('')
    console.log('<-------------------------- POST Request -------------------------->')
    console.log(' POST request was made to: ' + req.originalUrl + " -> " + new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''))
    console.dir("   request body: " + JSON.stringify(req.body))
    console.log('IP: ', req.ip)
    console.log('')

    return next()
})

router.patch('*', (req: Request, res: Response, next: Function) => {

    console.log('')
    console.log('<-------------------------- PATCH Request -------------------------->')
    console.log(' PATCH request was made to: ' + req.originalUrl + " -> " + new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''))
    console.dir("   request params: " + JSON.stringify(req.params))
    console.log('IP: ', req.ip)
    console.log('')

    return next()
})

router.delete('*', (req: Request, res: Response, next: Function) => {

    console.log('')
    console.log('<-------------------------- DELETE Request -------------------------->')
    console.log(' DELETE request was made to: ' + req.originalUrl + " -> " + new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''))
    console.dir("   request params: " + JSON.stringify(req.params))
    console.log('IP: ', req.ip)
    console.log('')

    return next()
})

export {router}