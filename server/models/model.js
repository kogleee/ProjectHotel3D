const mysql = require("mysql2");
require("dotenv").config();

class User {
  constructor() {
    this.connection = mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });
  }
  //User
  async showUser() {
    try {
      const [rows, fields] = await this.connection
        .promise()
        .query("SELECT * FROM user");
      return rows;
    } catch (err) {
      return err;
    }
  }

  async Registration(user) {
    try {
      const insertUser = await this.connection
        .promise()
        .query(
          "INSERT INTO user(email, phone, first_name, second_name, password) VALUES(?,?,?,?,?)",
          [
            user.email,
            user.phone,
            user.first_name,
            user.second_name,
            user.password,
          ]
        );
      console.log(insertUser);
      console.log(insertUser[0].insertId);
      const [rows, fields] = await this.connection
        .promise()
        .query("SELECT * FROM user WHERE id=?", [insertUser[0].insertId]);
      return rows[0];
    } catch (err) {
      return;
    }
  }

  async FindOne(email) {
    try {
      const [rows, fields] = await this.connection
        .promise()
        .query("SELECT * FROM user WHERE email=?", [email]);
      return rows[0];
    } catch {
      return;
    }
  }

  async CreateFavourite(favourite) {
    try {
      const [rows, fields] = await this.connection
        .promise()
        .query("INSERT INTO favourite(user_id) VALUES (?)", [favourite.id]);
      return rows;
    } catch {
      return;
    }
  }

  //Hotel

  async GetAllHotel() {
    try {
      const [rows, fields] = await this.connection
        .promise()
        .query(
          "SELECT hotel.*, AVG(rating.rating) AS 'average_rating' FROM hotel JOIN rating ON hotel.id = rating.hotel_id GROUP BY hotel.id, hotel.name;"
        );
      return rows;
    } catch (e) {
      console.log(e);
    }
  }

  async Find(date = null, residentCount = null) {
    if (date) {
      date = await this.formatDateToISO(date);
    }

    console.log(residentCount);
    try {
      const [rows, fields] = await this.connection.promise().query(
        `SELECT hotel.*, AVG(rating.rating) AS 'average_rating' FROM hotel
             LEFT JOIN rating ON hotel.id = rating.hotel_id 
             LEFT JOIN reservation ON reservation.hotel_id = hotel.id
             WHERE ((reservation.start_date IS NULL OR reservation.start_date > ? OR ? IS NULL)
             OR (reservation.end_date IS NULL OR reservation.end_date < ? OR ? IS NULL))
             AND (hotel.resident_count > ? OR ? IS NULL)
             GROUP BY hotel.id , hotel.name`,
        [date, date, date, date, +residentCount, +residentCount]
      );
      return rows;
    } catch (e) {
      console.log(e);
    }
  }

  async formatDateToISO(dateString) {
    // Разбиваем строку даты на компоненты
    const [day, month, year] = dateString.split(".");

    // Создаем объект Date
    const date = new Date(`${year}-${month}-${day}`);

    // Преобразуем объект Date в строку в формате ISO 8601
    const isoDate = date.toISOString();

    return isoDate;
  }

  async CreateHotel(hotel) {
    try {
      const [rows, fields] = await this.connection
        .promise()
        .query(
          "INSERT INTO hotel (name,description,cost,panorama_img,hotel_img,resident_count) VALUES (?,?,?,?,?,?)",
          [
            hotel.name,
            hotel.description,
            hotel.cost,
            [hotel.panoramaImg],
            [hotel.hotelImg],
            hotel.residentCount,
          ]
        );
      return rows;
    } catch (e) {
      console.log(e);
    }
  }

  async check() {
    try {
      const [rows, fields] = await this.connection
        .promise()
        .query("SELECT * FROM reservation");
      return rows;
    } catch (e) {
      console.log(e);
    }
  }

  async removeExpiredReservations() {
    let now = new Date();
    let formDate = await this.formatDate(now);
    try {
      const [rows, fields] = await this.connection
        .promise()
        .query(
          "DELETE FROM reservation WHERE DATE_FORMAT(end_date, '%d.%m.%Y') < ?",
          [formDate]
        );
      console.log("Успешно удалены", rows.affectedRows, "записей");
    } catch (e) {
      console.log(e);
    }
  }

  async formatDate(date) {
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear().toString();
    return `${day}.${month}.${year}`;
  }

  async StartCleanUp() {
    setInterval(() => {
      this.removeExpiredReservations();
    }, 24 * 60 * 60 * 1000);
  }
}

module.exports = new User();
