const express = require("express");
const router = express.Router();

const userRouter = require("./userRouter");
const hotelRouter = require("./hotelRouter");
const favouriteRouter = require("./favouriteRouter");

router.use("/user", userRouter);
router.use("/hotel", hotelRouter);
router.use("/favourite", favouriteRouter);

module.exports = router;
