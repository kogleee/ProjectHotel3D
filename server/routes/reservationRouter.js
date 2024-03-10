const express = require("express");
const reservationRouter = express.Router();
const ReservationController = require("../controllers/reservationController.js");
const authMiddleware = require("../middleware/authMiddleware.js");

reservationRouter.get("/show", authMiddleware, ReservationController.Show);
reservationRouter.post(
  "/add/:hotel?/:start?/:end?/:count?",
  authMiddleware,
  ReservationController.Add
);
reservationRouter.delete(
  "/delete/:hotel?",
  authMiddleware,
  ReservationController.Delete
);

reservationRouter.get("/dev", ReservationController.Dev);

module.exports = reservationRouter;
