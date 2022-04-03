//import express, {Router} from 'express'
const express = require('express')
const { Router } = require('express')
//const multer  = require('multer')
//const { routerProductos } = require('../productos') //ver si lo necesito
//import products from './routes/products.js'
//import cart from './routes/cart.js'
const products = require('./routes/products.js') 
const cart = require('./routes/cart.js')

const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const cors = require('cors');

app.use(cors());

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
  },
});

/*
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './desafio4/uploads');
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname) 
    }
  })

const upload = multer({ storage: storage })
*/

app.use('/api/productos', products)
app.use('/api/carrito', cart)


app.use(express.json()); 
app.use(express.urlencoded({extended: true})); 
app.use(express.static('/public'));

/*
app.get('/', (req, res) =>{
    res.sendFile(__dirname + '/public/indexd4.html')
})

app.use('/api/productos', routerProductos)

app.post('/profile', upload.single('avatar'), function (req, res, next) {
    console.log(req.file, req.body)
    res.status(200).send('ok');
  });
 */ 

const PORT = 8080;
server.listen(PORT, () => {
    console.log(`😃 Server started on http://localhost:${PORT}`)
});
server.on('error', (err) => console.log(err));   

/*
import express, {Router} from 'express'
//const multer = require('multer')
import productos from './rutas/productos.js'
import carrito from './rutas/carrito.js'
const app = express()


app.use('/api/productos', productos)
app.use('/api/carrito', carrito)

app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))
app.use(express.json())


// const storage = multer.diskStorage({
//     destination: ( req, file, cb) =>{
//         cb(null,'uploads')
//     },
//     filename: ( req, file, cb) =>{
//         cb(null, file.originalname)
//     }
// })

// const upload = multer({ storage })



const PORT = 8080
const server = app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${server.address().port}`)
})
server.on('error', error => console.log(`Error en servidor error`))

*/