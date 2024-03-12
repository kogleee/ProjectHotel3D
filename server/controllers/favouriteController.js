const path = require("path");
const Model = require("../models/model.js");
const ApiError = require("../error/errorApi.js");
require("dotenv").config();

class FavouriteController {
  async Show(req, res, next) {
    let user = req.user;
    let favourites = await Model.getFavourites({ id: user.id });
    if (!favourites) {
      return next(ApiError.internal("Ошибка запроса избранных"));
    }
    res.json(favourites);
  }

  async Add(req, res, next) {
    let user = req.user;
    let hotelId = req.query.hotel;
    let favourite = await Model.CreateFavourite({ id: user.id, hotelId });
    if (favourite == "Уже добавлено") {
      return next(ApiError.internal("Уже добавлено"));
    }
    res.json(favourite);
  }

  async Delete(req, res, next) {
    let user = req.user;
    let hotelId = req.query.hotel;
    let favourite = await Model.DeleteFavourite({ id: user.id, hotelId });
    if (!favourite) {
      return next(ApiError.internal("Ошибка удаления"));
    }
    res.json(favourite);
  }

  async Dev(req, res, next) {}
}

module.exports = new FavouriteController();
