const express = require('express')

const app = express()
app.use(express.json()); //para usar con POST
app.use(express.urlencoded({extended: true})); //para usar con POST

/* -------------------------GET---------------------*/
//pedir info

//a los get no se les debe mandar información (pero sí se puede), por eso el req va vacío
//endpoint es donde se pide la información
//api es el servidor
app.get('/api/mensaje', (req, res) => {
    res.status(200).send('mensaje GET') //endpoint básico para obtener información
    //res.status(200).json({ mensaje: 'mensaje GET' }); //si quiero mandar un json
})

//con parámetros (destructuring) y query
//http://localhost:8080/api/usuario?dni=1234 consulta
app.get('/api/usuario', (req, res) => {
    const { dni } =req.query;
    console.log(dni)
    //console.log(req.body) //para enviar data al servidor
    res.status(200).json({ mensaje: 'mensaje GET con query', dni }); 
}) 

/*
//con query y 2 parámetros
// http://localhost:8080/api/usuario?dni=1234&nombre=pablo consulta
app.get('/api/usuario', (req, res) => {
    const { dni, nombre } =req.query;
    console.log(dni, nombre)
    res.status(200).json({ mensaje: 'mensaje GET con query y 2 parámetros', dni, nombre }); 
})
*/

//solo con parámetros
//http://localhost:8080/api/usuario/1234/
app.get('/api/usuario/:dni', (req, res) => {
    const { dni } =req.params;
    console.log(dni)
    res.status(200).json({ mensaje: 'mensaje GET con parámetros', dni }); 
})

//solo con 2 parámetros
//http://localhost:8080/api/usuario/1234/abc
app.get('/api/usuario/:dni1/:dni2', (req, res) => {
    const { dni1, dni2 } =req.params;
    console.log(dni1, dni2)
    res.status(200).json({ mensaje: 'mensaje GET con 2 parámetros', dni1, dni2 }); //siempre devuelve string. hay que transfomarlo si quiero otro formato
})

/* -------------------------POST---------------------*/
//enviar info

app.post("/api/usuario", (req, res) => {
    const { body } = req;
    console.log(req.body);
    console.log(body);
  });

  /* -------------------------PUT---------------------*/
//actualizar info

app.put("/api/usuario/:id", (req, res) => {
    const { id } = req.params;
    const { body } = req;
    console.log(id, body);
    res.status(200).json({ id, body });
  });


/* -------------------------DELETE---------------------*/

app.delete("/api/usuario/:id", (req, res) => {
    const { id } = req.params;
    console.log(id);
    res.json({ id });
});


const PORT = 8081;
const server = app.listen(PORT, () => {
    console.log(`😃 Server started on http://localhost:${PORT}`)
});
server.on('error', (err) => console.log(err));

/*
//para json de body en thunder client
{
    "name":"coderhouse",
    "curso":28855
}
*/