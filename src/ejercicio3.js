const express = require('express')

const app = express();
app.use(express.json()); //para usar con POST
app.use(express.urlencoded({extended: true})); //para usar con POST

let frase = 'Hola mundo, cómo están?'; //se usa let para poder modificarla con POST

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

//http://localhost:8081/api/palabras/1
app.get('/api/palabras/:num', (req, res) => {
    
    const numero = parseInt(req.params.num - 1);//para que cuando escriba 1 salga la posición 0 del array de palabras

    const arrayFrase = frase.split(" ");

    if(numero < 0 || numero > frase.length) {
        res.status(400).json({mensaje: 'el número es inválido'})
    }

    const palabra = arrayFrase[numero]

    res.status(200).json({
       buscad: palabra,
    }); 
})


////http://localhost:8081/api/palabras
app.post('/api/palabras', (req, res) => {
    //console.log(req.body);
    const  { palabra } = req.body;
    frase += " " + palabra;
    const arrayFrase = frase.split(" ");
    //console.log(frase);
    res.status(200).json({
        agregada: palabra,
        pos: arrayFrase.length, //pos de posición 
        frase,
    })
})

//http://localhost:8081/api/palabras/1
app.put("/api/palabras/:pos", (req, res) => {
    const { pos } = req.params;
    const { palabra } = req.body;
    const arrayFrase = frase.split(" ");
    const anterior = arrayFrase[pos];
    arrayFrase[pos] = palabra;
    frase = arrayFrase.join(" ");
    res.status(200).json({
      actualizada: palabra, //inserto palabra en posición pos
      anterior, //antes estaba esta palabra en la posición pos
      frase, //frase después del reemplazo
    });
  });
  
  app.delete("/api/palabras/:pos", (req, res) => {
    const { pos } = req.params;
    const arrayFrase = frase.split(" ");
    console.log(arrayFrase);
    arrayFrase.splice(pos - 1, 1);
    frase = arrayFrase.join(" ");
    res.status(200).json({ frase });
  });

const server = app.listen(8081, () => {
    console.log('😃 Server started on http://localhost:8081')
});
server.on('error', (err) => console.log(err));
