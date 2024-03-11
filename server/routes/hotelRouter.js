const express = require("express");
const hotelRouter = express.Router();
const HotelController = require("../controllers/hotelController.js");
const authMiddleware = require("../middleware/authMiddleware.js");

hotelRouter.get("/showAll", HotelController.Show);
hotelRouter.post("/find/:date?/:residentCount?", HotelController.Find);
hotelRouter.post("/create", HotelController.Create);
hotelRouter.get("/dev", HotelController.Dev);
hotelRouter.post(
  "/rating/:hotel?/:rating?",
  authMiddleware,
  HotelController.SetRating
);

module.exports = hotelRouter;
