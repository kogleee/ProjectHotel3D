const mysql = require("mysql2");
  
const connection = mysql.createConnection({
  host: "89.111.170.69",
  user: "koglee",
  database: "Pidis_site",
  password: "js($NoDe!17"
});
 connection.connect(function(err){
    if (err) {
      return console.error("Ошибка: " + err.message);
    }
    else{
      console.log("Подключение к серверу MySQL успешно установлено");
    }
 });

 
  // connection.query(`SELECT * FROM users`,(err,res) => {
  //   if(err) console.log(err)
  //   else console.log(res)
  // })

  connection.end();