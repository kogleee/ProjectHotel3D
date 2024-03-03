const path = require("path")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const User = require("../models/model.js")
const ApiError = require("../error/errorApi.js")
require('dotenv').config();

const generateJwt = (id,email) => {
    return jwt.sign({id,email},
         process.env.SECRET_KEY,
         {expiresIn: "24h"})
}

class UserController{

    async regUser(req, res, next) {
        const { email, phone, first_name, second_name, password, second_password } = req.body
        if (!email || !phone || !first_name || !second_name || !password || !second_password) {
            return next(ApiError.badRequest("Некорректные данные"))
        }
        if (password != second_password) {
            return next(ApiError.badRequest("Пароли не совпадают"))
        }
        const candidate = await User.FindOne(email)
        if (candidate) {
            return next(ApiError.badRequest("Пользователь с таким email  уже существует"))
        }
        const hashPassword = await bcrypt.hash(password, 5)
        const user = await User.Registration({ email, phone, first_name, second_name, password: hashPassword })
        if (!user) {
            return next(ApiError.badRequest("Ошибка регистрации"))
        }
        const favourite = await User.CreateFavourite({ id: user.id })
        const token = generateJwt(user.id,user.email)
    }
    async loginUser(req, res, next) {
        const { email, password } = req.body
        const user = await User.FindOne(email)
        if (!user) {
            return next(ApiError.internal("Пользователя с таким email не существует"))
        }
        let comparePassword = bcrypt.compareSync(password, user.password)
        if (!comparePassword){
            return next(ApiError.internal("Неверный пароль"))
        }
        const token = generateJwt(user.id, user.email)
        return res.json({token})
    }

    async check(req,res,next){
        res.json({message: "Работает"})
    }

    async showUser(req, res, next) {
        const users = await User.showUser()
        console.log(users)
        return res.send(users)

    }


}

module.exports = new UserController()
