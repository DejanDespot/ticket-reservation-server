const express = require("express");
const app = express();
const mysql = require("mysql2");
const cors = require("cors");
const bodyParser = require("body-parser");

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

const PORT = 3001;

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "MiksiTicer23",
  database: "ticket_reservation",
});

app.get("/", (req, res) => {
  const sqlSelect = "SELECT * FROM ticket_reservation.movies";
  db.query(sqlSelect, (err, results) => {
    if (err) throw err;
    setTimeout(() => {
      res.send(results);
    }, 3000);
  });
});

app.post("/reservation", (req, res) => {
  // TODO: HANDLE DATABASE CALL
  const { firstName, lastName, movie, tickets, date, showtime } = req.body;
  const sqlInsert =
    "INSERT INTO reservations (first_name, last_name, movie, tickets, date, showtime) VALUES (?,?,?,?,?,?)";
  db.query(
    sqlInsert,
    [firstName, lastName, movie, tickets, date, showtime],
    (err, results) => {
      if (err) throw err;
      res.send(results);
    },
  );
});

app.listen(PORT, () => {
  console.log(`Running on ${PORT}`);

  db.connect(function (err) {
    if (err) throw err;
    console.log("Database connected!");
  });
});
