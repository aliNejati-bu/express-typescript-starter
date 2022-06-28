export function baseResponse(res, data: any = {}, message: string = "", token: any = undefined, status: string = "ok", statusCode = 200) {

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

export function asyncWrapper(fn: Function) {
    return async (req, res, next) => {
        try {
            await fn(req, res, next)
        } catch (err) {
            next(err)
        }
    }
}