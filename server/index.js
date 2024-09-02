const express = require("express");
const mysql = require('mysql')
const app = express();

require("dotenv").config()

const HOST = process.env.HOST || "localhost";
const PORT = process.env.PORT || 3001;
const USER = process.env.USER;
const PASSWORD = process.env.PASSWORD;
const DATABASE = process.env.DATABASE;

var connection = mysql.createConnection({
    host: HOST,
    user: USER,
    password: PASSWORD,
    database: DATABASE
})

connection.connect(function(err) {
    if (err)
        throw err;
    console.log("Tilkoblet " + DATABASE + "@" + HOST + " som " + USER);
});

app.get('/ping', function(req, res) 
{
    const source = '/gp24server/';
    let serverinfo = '{"ServerInfo":{"source":"' + source + '", "port":"' + PORT +'"}}';
    res.json({ message: JSON.parse(serverinfo)});      
});

app.get('/kommuner', function(req, res)
{
    const sql = "select kommune_nr as id, kommune_nv, fylke_nv as name from kommune, fylke where kommune.fylke_nr = fylke.fylke_nr";
    connection.query(sql, function (err, municipalities)
    {
        if (err)
            throw err;

        res.json({ message: municipalities });      
    });
});

app.get('/fylker', function(req, res)
{
    const sql = "select fylke_nr as id, fylke_nv as name from fylke";
    connection.query(sql, function (err, counties)
    {
        if (err)
            throw err;
        res.json({ message: counties });      
    });
});

app.listen(PORT, () => {
    console.log(`Server lytter på port ${PORT}`);
  });
  