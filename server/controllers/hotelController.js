const path = require("path");
const Hotel = require("../models/model.js");
const ApiError = require("../error/errorApi.js");
require("dotenv").config();

Hotel.StartCleanUp();

class hotelController {
  async Show(req, res, next) {
    const hotels = await Hotel.GetAllHotel();
    if (!hotels) {
      return next(ApiError.internal("Не удалось получить комнаты"));
    }
    res.json(hotels);
  }

  async Find(req, res, next) {
    let { date, residentCount } = req.query;
    console.log(date, residentCount);
    let hotels = await Hotel.Find(date, residentCount);
    console.log(hotels);
    res.json(hotels);
  }

  async Create(req, res, next) {
    const panoramaImg = "/panorama/pan1.html";
    let hotelImg = "/img/hotel1.png";
    let name = "Зелёный оазис";
    let description = "Комфортабельный 2-ух местный номер";
    let cost = 3000;
    let residentCount = 2;
    let newHotel = await Hotel.CreateHotel({
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
    let dev = await Hotel.check();
    // let panorama = dev.panorama_img.toString('utf-8')
    // let hotelImg = sharp(dev.hotel_img)
    // let savePath = path.join(__dirname, "../","static",`img${dev.id}.png`)

    // hotelImg.toBuffer()
    // .then(buffer => fs.writeFile(savePath, buffer))
    // .then(() => console.log('Изображение успешно сохранено'))
    // .catch(err => console.error('Ошибка при сохранении файла:', err));

    res.json({ dev });
  }
}

module.exports = new hotelController();
