export const ErrorMiddleware = (error, req,res, next) =>{
    res.send({
        status: error.name,
        cause: error.cause,
        message: error.message
    })
}