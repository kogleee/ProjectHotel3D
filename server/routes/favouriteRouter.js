const express = require("express");
const favouriteRouter = express.Router();
const FavouriteController = require("../controllers/favouriteController.js");
const authMiddleware = require("../middleware/authMiddleware.js");

favouriteRouter.get("/show", authMiddleware, FavouriteController.Show);
favouriteRouter.post("/add/:hotel?", authMiddleware, FavouriteController.Add);
favouriteRouter.delete(
  "/delete:hotel?",
  authMiddleware,
  FavouriteController.Delete
);
// hotelRouter.post("/create", HotelController.Create);
favouriteRouter.get("/dev", FavouriteController.Dev);

module.exports = favouriteRouter;
