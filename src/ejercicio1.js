const express = require('express')

const app = express()

const frase = 'Hola mundo, cómo están';

//http://localhost:8080/api/frase
app.get('/api/frase', (req, res) => {
    res.status(200).json({frase}); 
})

//http://localhost:8080/api/letras/0 ok
//http://localhost:8080/api/letras/3 ok
//http://localhost:8080/api/letras/-1 error
//http://localhost:8080/api/letras/50 error
app.get('/api/letras/:num', (req, res) => {
    
    const numero = req.params.num;

    if(numero < 0 || numero > frase.length) {
        res.status(400).json({mensaje: 'el número es inválido'})
    }

    const caracter = frase.charAt(numero)
    //console.log(numero)
    res.status(200).json({caracter}); 
})

//http://localhost:8080/api/palabras/1
app.get('/api/palabras/:num', (req, res) => {
    
    const numero = parseInt(req.params.num - 1);//para que cuando escriba 1 salga la posición 0 del array de palabras

    const arrayFrase = frase.split(" ");

    if(numero < 0 || numero > frase.length) {
        res.status(400).json({mensaje: 'el número es inválido'})
    }

    const palabra = arrayFrase[numero]

    res.status(200).json({palabra}); 
})


const server = app.listen(8080, () => {
    console.log('😃 Server started on http://localhost:8080')
});
server.on('error', (err) => console.log(err));
