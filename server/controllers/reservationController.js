const path = require("path");
const Model = require("../models/model.js");
const ApiError = require("../error/errorApi.js");
require("dotenv").config();

class ReservationController {
  async Show(req, res, next) {
    let user = req.user;
    let reservation = await Model.getReservation({ id: user.id });
    if (!reservation) {
      return next(ApiError.internal("Ошибка запроса избранных"));
    }
    res.json(reservation);
  }

  async Add(req, res, next) {
    let userId = req.user.id;
    let hotelId = req.query.hotel;
    let startDate = req.query.start;
    let endDate = req.query.end;
    let residentCount = req.query.count;
    let reservation = await Model.createReservation({
      userId,
      hotelId,
      startDate,
      endDate,
      residentCount,
    });
    if (reservation == "Уже добавлено") {
      return next(ApiError.internal("Уже добавлено"));
    }
    if (!reservation) {
      return next(ApiError.internal("Некорректные данные"));
    }
    res.json(reservation);
  }

  async Delete(req, res, next) {
    let userId = req.user.id;
    let hotelId = req.query.hotel;
    let reservation = await Model.deleteReservation({ userId, hotelId });
    if (!reservation) {
      return next(ApiError.internal("Ошибка удаления"));
    }
    res.json(reservation);
  }

  async Dev(req, res, next) {}
}

module.exports = new ReservationController();
