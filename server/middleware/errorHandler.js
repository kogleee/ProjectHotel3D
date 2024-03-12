const ApiError = require("../error/errorApi")

module.exports = function(err,req,res,next){
    if(err instanceof ApiError){
        return res.status(err.status).json({message: err.message})
    }
    return res.staus(500).json({message: "непредвиденная ошибка"})
}