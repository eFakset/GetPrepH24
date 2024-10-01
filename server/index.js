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
    const sql = "select kommune_nr as id, kommune_nv as name from kommune where fylke_nr != '00'";
    connection.query(sql, function (err, municipalities)
    {
        if (err)
        {
            console.log("FEIL ved les kommuner: " + err.sqlMessage);
            res.status(500).send();
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
            res.status(500).send();
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
            res.status(500).send();
        }
        res.json({ message: categories });      
    });
});

app.get('/varer', function(req, res)
{
// Lar logikk for vgr ligge selvom den ikke lenger er aktuell    
// Hent argument (vgr) fra url
    let q = url.parse(req.url, true);
    let qdata = q.query;
    let catNo = qdata.vgr;
   
    let sql = `select vare_nr as id, vare_nv as name, varegruppe.varegruppe_nr as categoryId, varegruppe_nv as categoryName
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
            res.status(500).send();
        }
        res.json({ message: articles });      
    });
});

app.get('/kunder', function(req, res) 
{
// Definisjon: items/Customer.js    
    const sql = 'select kunde_nr as id, kunde_nv as name, kommune_nv as municipalityName, fylke_nv as countyName, 1 as isDeletable' +
                ' from kunde, kommune, fylke' +
                ' where kunde.kommune_nr = kommune.kommune_nr and kommune.fylke_nr = fylke.fylke_nr' +
                ' and kunde_nr > 0' +
                ' order by fylke.fylke_nr, kommune.kommune_nr, 3';  
    connection.query(sql, function (err, customers) 
    {
        if (err)
        {
            console.log("FEIL ved les av kunder: " + err.sqlMessage);
            res.status(500).send();
        }
        else
        {
            res.json({ message: customers });
        }
    });
});

// Legger til app.use(express.json()): parse JSON req og legger resultatet i req.body
app.use(express.json());

// For alle funksjoner som oppdaterer kunde: req.body inneholder en JSON-struktur med informasjon


app.delete('/slettkunde', function(req, res) {
    const sql = "delete from kunde where kunde_nr = ?";
    connection.query(sql, [req.body.custid], function (err, result)
    {
        if (err)
        {
            if (err.errno === 1451)
            {
                console.log("Kunde med kundenummer " + req.body.custid + " har handlet og kan ikke slettes"); // Skal ikke skje
                res.status(400).send();
            }
            else
            {
                console.log("FEIL ved sletting av kunde: " + err.sqlMessage);
                res.status(500).send();
            }
        }
        else
        {
            console.log("Slettet: " + req.body.custid);
            res.status(200).json(req.body).send();
        }
    });
});

app.put('/nykunde', function(req, res) 
{
// Dette er ikke en optimal måte å løse "problemet" med å bestemme kunde_nr for ny kunde - kommer tilbake til auto_increment!
    let sql = "select max(kunde_nr) as maxid from kunde";

    connection.query(sql, function (err, rows) 
    {
        if (err)
        {
            console.log("FEIL ved les høyeste kundenummer: " + err.sqlMessage);
            res.status(500).send();
        }
        else
        {
            const newId = rows[0].maxid + 1;
            sql = "insert into kunde values(?, ?, ?)";

            connection.query(sql, [newId, req.body.Customer.customerName, req.body.Customer.municipalityNo], function (err, result)
            {
                if (err)
                {
                    console.log("FEIL ved ny kunde: " + err.sqlMessage);
                    res.status(500).send();
                }
                else
                {
                    console.log("Lagt til ny kunde: " + req.body.Customer.customerName);
                    res.status(200).json(req.body).send();
                }
            });
        }
    });
});

app.put('/oppdaterkunde', function(req, res) 
{
    let sql = "update kunde set kunde_nv = ?, kommune_nr = ? where kunde_nr = ?";

    connection.query(sql, [req.body.Customer.customerName, req.body.Customer.municipalityNo, req.body.Customer.customerId], function (err, result)
    {
        if (err)
        {
                console.log("FEIL ved oppdatering av kunde: " + err.sqlMessage);
                res.status(500).send();
        }
        else
        {
            console.log("Oppdatert kunde: " + req.body.Customer.customerName);
            res.status(200).json(req.body).send();
        }
    });
});

app.get('/butikker', function(req, res) 
{
    // Definisjon: items/Store.js    
    const sql = 'select butikk_nr as id, butikk_nv as name, kommune_nv as municipalityName, fylke_nv as countyName' +
    ' from butikk, kommune, fylke' +
    ' where butikk.kommune_nr = kommune.kommune_nr' +
    ' and kommune.fylke_nr = fylke.fylke_nr' +
    ' order by fylke.fylke_nr, kommune.kommune_nr';  

    connection.query(sql, function (err, stores) 
    {
        if (err)
        {
            console.log("FEIL ved les butikker: " + err.sqlMessage);
            res.status(500).send();
        }
        else
            res.json({ message: stores });
    });
});

app.get('/perioder', function(req, res) 
{
    const sql = "select year(tidspunkt) * 100 + month(tidspunkt) as id, min(tidspunkt) as firstsale from handel group by year(tidspunkt) * 100 + month(tidspunkt) order by 1 desc"
    connection.query(sql, function (err, rows) 
    {
        if (err)
        {
            console.log("FEIL ved les perioder: " + err.sqlMessage);
            res.status(500).send();
        }
        else
            res.json({ message: rows });
    });
});

app.get('/handler', function(req, res)
{
    let sql = "select handel_nr as id, kjede_nv as chainName, butikk_nv as storeName, kunde_nv as customerName, tidspunkt as ts, handel_bel as amount" +
                    " from handel, butikk, kjede, kunde" +
                    " where handel.butikk_nr = butikk.butikk_nr and handel.kunde_nr = kunde.kunde_nr and butikk.kjede_nr = kjede.kjede_nr";

    var q = url.parse(req.url, true);
    var qdata = q.query;

    const storeid = qdata.storeid;
    const customerid = qdata.customerid;
    const period = qdata.period;

    let args = [];
    let idx = 0;

    if (storeid)
    {
        args[idx] = storeid;
        sql = sql + " and handel.butikk_nr = ?";
        idx++;
    }
    if (customerid)
    {
        args[idx] = customerid;
        sql = sql + " and handel.kunde_nr = ?";
        idx++;
    }
    if (period)
    {
        args[idx] = period;
        sql = sql + " and (year(tidspunkt) * 100 + month(tidspunkt)) = ?";
    }
    sql = sql + " order by id desc";

    connection.query(sql, args, function (err, rows)
    {
        if (err)
        {
            console.log("FEIL ved les handler: " + err.sqlMessage);
            res.status(500).send();
        }
        else
            res.json({ message: rows });
    });
});

app.get('/jsonbong', function(req, res) 
{
/* Henter all informasjon om en handel i én JSON-struktur:  
   Handel som JSON_OBJECT
   Varelinjer og bonus som et JSON_ARRAYAGG av JSON_OBJECT-er
*/
    var q = url.parse(req.url, true);
    var qdata = q.query;
    const saleid = qdata.saleid;

    let sql = "select JSON_OBJECT('id', handel.handel_nr, 'storeId', butikk.butikk_nr, 'storeName', butikk.butikk_nv, 'registerNo', kasse_nr, 'chainName', kjede_nv, 'customerId', kunde.kunde_nr," +
    "'customerName', kunde_nv, 'ts', tidspunkt, 'amount', handel_bel, " +
    "'articleLines'," +
    "(select JSON_ARRAYAGG(" +
    "JSON_OBJECT('id', vare_nr, 'articleId', vare_nr, 'articleName', vare_nv, 'unitCount', enhet_ant, 'amount', varelinje_bel))" +
    " from vvarelinje where handel_nr = ?" +
    "), 'bonus'," +
    "(select JSON_ARRAYAGG(JSON_OBJECT('id', id, 'name', bonus_nv, 'amount', bonus_bel))" +
    "from vbonus where handel_nr = ?" +
    ")) as Sale from handel, butikk, kjede, kunde" +
    " where handel.butikk_nr = butikk.butikk_nr and butikk.kjede_nr = kjede.kjede_nr and handel.kunde_nr = kunde.kunde_nr" +
    " and handel_nr = ?" + 
    " group by handel_nr";

// saleid oppgis 3 ganger fordi den opptrer 3 ganger i SQL
    connection.query(sql, [saleid, saleid, saleid], function (err, purchase) 
    {
        if (err)
        {
            console.log("FEIL ved les jsonbong: " + err.sqlMessage);
            res.status(500).send();
        }
        else
            res.json({ message: purchase});

    });
});

app.listen(PORT, () => {
    console.log(`Server lytter på port ${PORT}`);
});