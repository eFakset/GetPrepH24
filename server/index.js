const express = require("express");
const mysql = require('mysql')
const url = require('url')
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
    const source = 'gp24server';
    let serverinfo = '{"ServerInfo":{"source":"' + source + '", "port":"' + PORT +'"}}';
    res.json({ message: JSON.parse(serverinfo)});      
});

app.get('/kommuner', function(req, res)
{
    const sql = "select kommune_nr as id, kommune_nv as name from kommune";
    connection.query(sql, function (err, municipalities)
    {
        if (err)
        {
            console.log("FEIL ved les kommuner: " + err.sqlMessage);
            res.status(400).send();
        }
        else
            res.json({ message: municipalities });      
    });
});

app.get('/fylker', function(req, res)
{
    const sql = "select fylke_nr as id, fylke_nv as name from fylke";
    connection.query(sql, function (err, counties)
    {
        if (err)
        {
            console.log("FEIL ved les fylker: " + err.sqlMessage);
            res.status(400).send();
        }
        res.json({ message: counties });      
    });
});

app.get('/varegrupper', function(req, res)
{
    const sql = `select varegruppe_nr as id, varegruppe_nv as name from varegruppe`;
    connection.query(sql, function (err, categories)
    {
        if (err)
        {
            console.log("FEIL ved les varegrupper: " + err.sqlMessage);
            res.status(400).send();
        }
        res.json({ message: categories });      
    });
});

app.get('/varer', function(req, res)
{
// Hent argument (vgr) fra url
    let q = url.parse(req.url, true);
    let qdata = q.query;
    let catNo = qdata.vgr;
   
    let sql = `select vare_nr as id, vare_nv as name, varegruppe_nv as categoryName
                from vare
                inner join varegruppe using (varegruppe_nr)`;
// Hvis vgr er valgt i klient (vgr != -1) -> legg til filter/where clause               
    if (catNo && catNo != -1)        
        sql = sql + " where vare.varegruppe_nr = ?";

// Legg til (array) for vgr                
    connection.query(sql, [catNo], function (err, articles)
    {
        if (err)
        {
            console.log("FEIL ved les varer: " + err.sqlMessage);
            res.status(400).send();
        }
        res.json({ message: articles });      
    });
});

app.listen(PORT, () => {
    console.log(`Server lytter på port ${PORT}`);
  });
  