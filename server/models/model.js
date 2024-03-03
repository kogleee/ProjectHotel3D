const mysql = require("mysql2");
require('dotenv').config();

class User{

    constructor(){
        this.connection = mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME
          });
    }
    
    async showUser(){
        try{
            const [rows,fields] = await this.connection.promise().query("SELECT * FROM user")
            return rows
        }catch(err){
            return err;
        }
       
    }

    async Registration(user){
        try{
            const insertUser = await this.connection.promise().query("INSERT INTO user(email, phone, first_name, second_name, password) VALUES(?,?,?,?,?)",
             [user.email, user.phone, user.first_name, user.second_name, user.password])
             console.log(insertUser)
             console.log(insertUser[0].insertId)
            const [rows, fields] = await this.connection.promise().query("SELECT * FROM user WHERE id=?", [insertUser[0].insertId])
            return rows[0]
        }catch(err){
            return;
        }
        
    }

    async FindOne(email){
        try{
            const [rows,fields] = await this.connection.promise().query("SELECT * FROM user WHERE email=?",[email])
            return rows[0]
        }catch{
            return;
        }
       
    }
        
    

    async CreateFavourite(favourite){
        try{
             const [rows,fields] =  await this.connection.promise().query("INSERT INTO favourite(user_id) VALUES (?)",[favourite.id])
            return rows
        }catch{
            return;
        }
      
    }
}

module.exports = new User()

