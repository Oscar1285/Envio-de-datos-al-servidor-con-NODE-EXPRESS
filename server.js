// importar el modulo de "express" de la carpeta "node_modules"
const express = require('express');

// Creamos un objeto "app" a traves del modulo (clase) de express
const app = new express();
// puerto por el que el servidor local escucha. "http://localhost:3000"
const port = 3000;

// DATABASE
// importamos modulo de mysql
const mysql = require('mysql');
const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: 'uf2180'
});
con.connect((err) => {
  if (err) {
    console.log("Error en la conexion a la DB");
  } else {
    console.log("Conexion a la DB correcta!");
  }
});

app.use(express.json());

app.use(express.static('public'));



app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html')

  
});


app.post('/contrasenya', (req, res) => {
  const contrasenya = req.body.contrasenya;
  

  const sql = "insert into contrasenya values('" + contrasenya + "');"
  
  con.query(sql, function (err, result) {
  
    if (err) {
      res.json("Ha ocurrido un error en la inserción del dato");
    } else {
      res.json("Dato insertado en la DB OK!!!");
    } 
  });
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});