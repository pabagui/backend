const express = require('express')

const app = express();
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 
app.use(express.static("./src/public")); //ruta de la carpeta donde está el archivo html (index.html)
//http://localhost:8083/mujerplaya.jpg //para acceder a imagen dentro de carpeta public
//ninguna info sensible se comparte en esta carpeta
app.use("/otra", express.static(__dirname + "/public")); //doble guión bajo para que funcione path

app.get('/', (req, res) => {
    res.sendFile('./src/index.html');
});



const PORT = 8083;
const server = app.listen(PORT, () => {
    console.log(`😃 Server started on http://localhost:${PORT}`)
});
server.on('error', (err) => console.log(err));