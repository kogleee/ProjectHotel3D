const path = require("path");
const Model = require("../models/model.js");
const ApiError = require("../error/errorApi.js");
require("dotenv").config();

Model.StartCleanUp();
Model.Ping();

class hotelController {
  async Show(req, res, next) {
    const hotels = await Model.GetAllHotel();
    if (!hotels) {
      return next(ApiError.internal("Не удалось получить комнаты"));
    }
    res.json(hotels);
  }

  async Find(req, res, next) {
    let { date, residentCount, rating, cost } = req.query;
    let hotels = await Model.Find(date, residentCount, rating, cost);
    if (!hotels) {
      return next(ApiError.internal("Не удалось найти данные"));
    }
    res.json(hotels);
  }

  async SetRating(req, res, next) {
    let { hotel, rating } = req.query;
    let userId = req.user.id;
    let Resrating = await Model.createRating({ hotel, rating, userId });
    if (!Resrating) {
      return next(ApiError.internal("Вы уже поставили оценку"));
    }
    return res.json(Resrating);
  }

  async Create(req, res, next) {
    const panoramaImg = "/panorama/pan4.html";
    let hotelImg = "/img/hotel4.png";
    let name = "Солнечный берег";
    let description = "Комфортабельный 3-ёх местный номер";
    let cost = 5000;
    let residentCount = 3;
    let newHotel = await Model.CreateHotel({
      name,
      description,
      cost,
      panoramaImg,
      hotelImg,
      residentCount,
    });
    res.json({ newHotel });
  }

  async Dev(req, res, next) {
    let dev = await Model.check();
    res.json({ dev });
  }
}

module.exports = new hotelController();
