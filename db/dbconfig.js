import mysql from "mysql2";
 export default mysql.createPool({
    host:"localhost",
    user:"root",
    password:"chetna22rathore",
    database:"shoesmall",
    connectionLimit:100

})