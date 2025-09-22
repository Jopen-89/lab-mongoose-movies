const mongoose = require('mongoose')


const Celebrity = require('../models/Celebrity.model')

//CONECTAR A LA BASE DE DATOS (conectada MISMA que en app.js)
//si haces carpeta db con la conexion a MongoDB, se hace require("../db")

mongoose.connect('mongodb://127.0.0.1:27017/starter-code')
  .then(() => 
    console.log('Conectado a Mongo para seeds'))

const celebrities = [
  {
    name: "Leonardo DiCaprio",
    occupation: "Actor",
    catchPhrase: "I'm the king of the world!"
  },
  {
    name: "Beyoncé",
    occupation: "Singer",
    catchPhrase: "Who run the world? Girls!"
  },
  {
    name: "Elon Musk",
    occupation: "Entrepreneur",
    catchPhrase: "Let's make life multi-planetary."
  }
];

Celebrity.create(celebrities)
    .then(celebriFromDb => {
        console.log("instancia creada en Db", celebriFromDb.length)
        mongoose.connection.close()
    })
    .catch(err => console.log("error creando la instancia", err))


