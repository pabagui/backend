// https://trail-aware-catmint.glitch.me
// https://trail-aware-catmint.glitch.me/productos
// https://trail-aware-catmint.glitch.me/productoRandom
// codigo: https://glitch.com/edit/#!/trail-aware-catmint

const express = require('express');
const {Contenedor} = require('./container.js');

const productos = new Contenedor('productos.json');

const app = express();

const PORT = 8080

const random = (number)=> parseInt(Math.random() * number)

const server = app.listen(PORT, () => {
    console.log(`😃 servidor escuchando en el puerto http://localhost:${PORT}`)
    
    app.get('/', (req, res) => {
        res.send('<h1>😃Hola servidor Express para el desafío 3</h1>');
    })
    
    app.get('/productos', async (req, res) => {  
        
        const prods = await productos.getAll();
        console.log(prods);
        res.send(prods);
    })
    app.get('/productoRandom', async (req, res) => {
        const prods = await productos.getAll();
        res.send(prods[random(prods.length)]);
    })
});

server.on('error', (error) => console.log(error));

// node ./serverExpress.js

/*
//ejercicio de clase 3
let  counter = 0;
 
app.get('/', (req, res) => {
    res.send('<h1>Hola servidor Express</h1>');
})
app.get('/1', (req, res) => {
    res.send('<h1>😃Hola servidor ruta 1</h1>');
})
app.get('/objeto', (req, res) => {
    res.json({name: 'Pablo' , emoji:'😃'});
})

app.get('/contador', (req, res) => {
    counter++;
    res.send(`El conteo es ${counter}`);
})

const PORT = 3001

const server = app.listen(PORT, () => {
    console.log(`😃 servidor escuchando en el puerto http://localhost:${PORT}`)
});

server.on('error', (error) => console.log(error));
*/

//nombredeservidor.glitch.me
