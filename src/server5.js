const express = require('express')
const multer  = require('multer')  //multer es librería middleware para subir archivos al servidor
//const upload = multer({ dest: 'uploads/' }) //para guardar archivo subidos en la carpeta uploads, pero lo sube con nombre distinto
/*
const storage = multer.diskStorage({
    destination: function (req, file, cb) { //manda el mismo archivo pero con prefijo avatar
      cb(null, 'uploads');
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix)
    }
  });
  */
  const storage = multer.diskStorage({
    destination: function (req, file, cb) { //manda el mismo archivo pero con prefijo avatar
      cb(null, 'uploads');
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname) //as+i lo guarda con el nombre de origen
    }
  })
  
  const upload = multer({ storage: storage })

const app = express();
app.use(express.json()); 
app.use(express.urlencoded({extended: true})); 
app.use(express.static('./src/public'));

app.post('/profile', upload.single('avatar'), function (req, res, next) {
    console.log(req.file, req.body)
    res.status(200).send('ok');
    // req.file is the `avatar` file
    // req.body will hold the text fields, if there were any
  });
  



const PORT = 8085;
const server = app.listen(PORT, () => {
    console.log(`😃 Server started on http://localhost:${PORT}`)
});
server.on('error', (err) => console.log(err));    