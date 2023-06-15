var express = require("express");
var app = express();
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false })

const sqlite3 = require('sqlite3').verbose();
const PATH = "./data/database.db";

app.listen(3000)
app.use(express.static("./frontend/"));
app.use(express.json())

app.post('/enviar_mensagem', (req, res) => {
    var db = new sqlite3.Database(PATH);
	var sql = "INSERT INTO Tbl_Mensagem (MENSAGEM) VALUES ('" + req.body.mensagem + "')";
	console.log(sql);
	db.run(sql, [], err => {
		if (err) {
			throw err;
		}
	});
	res.json({ mensagem: "Mensagem enviada!" }); // Retornar uma resposta JSON
	db.close();
	res.end();
	res.redirect('/')
})

app.get('/listar_mensagem', (req, res) => {
    var db = new sqlite3.Database(PATH);
    sql = "SELECT MENSAGEM FROM Tbl_Mensagem"
    db.all(sql, [], (err, rows) => {
		if (err) {
			throw err;
		}
		res.json(rows);
	});
	db.close();
})