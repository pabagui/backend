const http = require('http')

//creación de servidor
const server = http.createServer((req, res)=> {
    //res.end('Hola servidor Http')
    res.end(JSON.stringify(new Date().toLocaleString()));
})

//levantamiento de servidor
const PORT = 3000
/*
const connectedServer = server.listen(PORT, () => {
    console.log(`😃 servidor escuchando en el puerto http://localhost:${PORT}`)
});
*/
server.listen(PORT, () => {
    console.log(`😃 servidor escuchando en el puerto http://localhost:${PORT}`)
});