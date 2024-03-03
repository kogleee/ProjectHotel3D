const express = require("express")
const userRouter = express.Router()
const UserController = require("../controllers/UserController.js")
const authMiddleware = require("../middleware/authMiddleware.js")

userRouter.post("/reg", UserController.regUser)
userRouter.post("/login", UserController.loginUser)
userRouter.get("/auth", authMiddleware, UserController.check)


module.exports = userRouter
