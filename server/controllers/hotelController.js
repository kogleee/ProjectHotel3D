const path = require("path");
const Model = require("../models/model.js");
const ApiError = require("../error/errorApi.js");
require("dotenv").config();

Model.StartCleanUp();

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

  // async Create(req, res, next) {
  //   const panoramaImg = "/panorama/pan2.html";
  //   let hotelImg = "/img/hotel2.png";
  //   let name = "Лунное озеро";
  //   let description = "Комфортабельный 1-но местный номер";
  //   let cost = 2000;
  //   let residentCount = 1;
  //   let newHotel = await Hotel.CreateHotel({
  //     name,
  //     description,
  //     cost,
  //     panoramaImg,
  //     hotelImg,
  //     residentCount,
  //   });
  //   res.json({ newHotel });
  // }

  async Dev(req, res, next) {
    let dev = await Model.check();
    res.json({ dev });
  }
}

module.exports = new hotelController();
