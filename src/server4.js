const express = require('express')

const app = express();
app.use(express.json()); 
app.use(express.urlencoded({extended: true})); 
app.use((req, res, next) => {                 //ejemplo de middleware a nivel de aplicación
    console.log(new Date().toLocaleString());
    next();
  });


  const router = express.Router()   //ejemplo de middleware a nivel de router
  router.use((req, res, next) => {
      console.log('Middleware en router');
      next();
  })

  router.get('/1', (req, res) => {
      res.status(200).send('Router1');
  });
  router.get('/2', (req, res) => {  
    res.status(200).send('Router2');
})



const middle1 = (req, res, next) => { //se usa para verificar datos, loggeos, permisos, etc
    console.log(req.body);
    console.log('yo soy un middleware1');
    //res.status(400).send("Error"); //si uso esta línea no deja continuar con el código por el error
    next();
};
const middle2 = (req, res, next) => { 
    console.log(req.body);
    console.log('yo soy un middleware2');
    next();
};
const middle3 = (req, res, next) => { 
    console.log(req.body);
    console.log('yo soy un middleware3');
    next();
};

app.get('/', middle1, middle3, middle2, (req, res) => {
    console.log('Respuesta1');
    res.status(200).send("Respuesta1")
})

app.use('/route', router);

const PORT = 8084;
const server = app.listen(PORT, () => {
    console.log(`😃 Server started on http://localhost:${PORT}`)
});
server.on('error', (err) => console.log(err));  