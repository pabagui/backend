const express = require('express')
const multer  = require('multer')
const { routerProductos } = require('../productos')


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './desafio4/uploads');
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname) 
    }
  })

const upload = multer({ storage: storage })


const app = express();
app.use(express.json()); 
app.use(express.urlencoded({extended: true})); 
app.use(express.static('/public'));


app.get('/', (req, res) =>{
    res.sendFile(__dirname + '/public/indexd4.html')
})

app.use('/api/productos', routerProductos)

app.post('/profile', upload.single('avatar'), function (req, res, next) {
    console.log(req.file, req.body)
    res.status(200).send('ok');
  });
  

const PORT = 8080;
const server = app.listen(PORT, () => {
    console.log(`😃 Server started on http://localhost:${PORT}`)
});
server.on('error', (err) => console.log(err));   