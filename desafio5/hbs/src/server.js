const express = require("express");
const { engine } = require("express-handlebars");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.set('views', './src/views');
app.set('view engine', 'hbs' );

app.engine(
    'hbs',
     engine({
    extname: '.hbs', 
    defaultLayout: 'index.hbs',
    layoutsDir: __dirname + '/views/layout',
    partialsDir: __dirname + '/views/partials'
}));

const productos = [];
/*
const productos = [
    {
        "title":"Cavancha",
        "price":55000,
        "thumbnail":"https://i.ibb.co/9v9TrJ0/naranjo.jpg",
        "id":1
    },
    {
        "title":"Bombín",
        "price":45000,
        "thumbnail":"https://i.ibb.co/9NsMW2N/negro.jpg",
        "id":2
    },
    {
        "title":"Aroma",
        "price":50000,
        "thumbnail":"https://i.ibb.co/DGr0LVV/amarillo.jpg",
        "id":3
    }
]

*/
app.get('/', (req, res) => {
    res.render('main', {
        rutaFormulario:true,
        rutaProductos:false
    })
});

app.get('/productos', (req, res) => {
    const hayProductos = productos.length > 0;
    res.render('main', {
        rutaProductos:true, 
        productos, 
        formulario:false, //false para ocultar en el html
        hayProductos:hayProductos})
});


app.post('/productos', (req, res) => {
    //const { body } = req;
    productos.push(body);
    res.render('main', {
        productos,
        cargar: false
    })
})

const PORT = 8080;
const server = app.listen(PORT, () =>
  console.log(`🚀 Server started on port http://localhost:${PORT}`),
);
server.on("error", (err) => console.log(err));