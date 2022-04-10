const express = require("express");
const http = require("http"); //porque websocket.io no funciona con express
const app = express();
const server = http.createServer(app); //así se conecta con express el http
const { Server } = require("socket.io");
const fs = require('fs');

const {mysqlOptions} = require('./mysqlOptions')
const sqlite3Options = require('../ecommerce/SQLite3')
const {Database} = require('./db')


const io = new Server(server);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('./src/public'));

app.set('templates', './public/templates')
app.set('view engine', 'ejs')

const mensajes = [];
const productos = [];





class Contenedor {
    constructor(file){
        this.id = 0
        this.file = file;
    }
    async save(data){
        data.id = this.id
        await fs.promises.readFile(this.file,'utf-8')
        .then(archivo => JSON.parse(archivo))// si lee el archivo lo parsea
        .then(archivo => {
            if (archivo.length != 0){
                data.id = archivo[archivo.length - 1].id + 1;
                this.id = data.id;
            }
            archivo.push(data);
            return archivo;
        })// si hay un array de objetos agrega el nuevo objeto
        .then(archivo => {
            fs.promises.writeFile(this.file, JSON.stringify(archivo)).catch(error =>console.log(error))
        })// y vuelve a escribir el archivo
        .catch(error => {
            console.log(error);
            fs.promises.writeFile(this.file, JSON.stringify([data])).catch(err => console.log(err));
            console.log('Se creó el archivo')
            this.id = null;        
        })
        return this.id;
    }

    
    async getAll(){
        return await fs.promises.readFile(this.file,'utf-8')
        .then(archivo => JSON.parse(archivo))// si lee el archivo lo parsea
        .catch(error => console.log(error))
    }
    
}

const Datos = new Contenedor('Mensajes.json')

io.on('connection', async socket => {
    console.log('Nuevo usuario')
    const Mensajes = await Datos.getAll()
    //const Productos = await Datos.getAll()
    
    socket.emit('mensajes', Mensajes)
    socket.emit('productos', productos)
    
    
    socket.on('newMessage', async ({mail, mensaje, fecha}) =>{
        await Datos.save({mail, mensaje, fecha})
        io.emit('mensajes', await Datos.getAll())
    })
    
    
    socket.on('newProduct', producto => {
        productos.push(producto)
        io.emit('productos', productos)
    })
    
})

/*
app.get("/", (req, res) => {
  res.sendFile("index.html");
});
*/





const PORT = 8080;
/*
const server = app.listen(PORT, () =>
console.log(`🚀 Server started on port http://localhost:${PORT}`),
);
*/
server.listen(PORT, () => console.log(`🚀 Server started on port http://localhost:${PORT}`));