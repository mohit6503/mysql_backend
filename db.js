import mysql from 'mysql2'
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'mohit@4203',  
    database: 'school'
});

connection.connect((err) => {
    if (err) throw err;
    console.log("Connected to MySQL database!");
});

export default connection;
