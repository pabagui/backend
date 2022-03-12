const express = require('express')

const app = express()
app.use(express.json()); //para usar con POST
app.use(express.urlencoded({extended: true})); //para usar con POST

//http://localhost:3032/api/sumar/5/6
app.get("/api/sumar/:num1/:num2", (req, res) => {
    const { num1, num2 } = req.params;
    const suma = Number(num1) + Number(num2); //para que transforme de string a número
    res.status(200).send(`Suma: ${suma}`);
})


//http://localhost:3032/api/sumar?num1=5&num2=62
app.get("/api/sumar", (req, res) => {
    const { num1, num2 } =req.query;
    const suma = Number(num1) + Number(num2);
    res.status(200).send(`Suma: ${suma}`); 
})

//http://localhost:3032/api/sumar?num1=5&num2=62
app.get("/api/operacion/:operacion", (req, res) => {
    const { operacion } =req.params;
    const suma = eval(operacion); //todo lo que recibe eval comop parámetro lo ejecuta. NO USAR porque se puede poner una base de datos ahí y se roba info
    res.status(200).send(`Suma: ${suma}`); 
})




const PORT = 3032;
const server = app.listen(PORT, () => {
    console.log(`😃 Server started on http://localhost:${PORT}`)
});
server.on('error', (err) => console.log(err));
