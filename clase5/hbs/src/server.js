const express = require("express");
const {engine} = require("express-handlebars");

const usuarios = [
    {
        nombre: 'nombre 1',
        edad: 31,
        estilo: 'est1'
    },
    {
        nombre: 'nombre 1',
        edad: 32,
        estilo: 'est2'
    },
    {
        nombre: 'nombre 1',
        edad: 33,
        estilo: 'est2'
    }
]


const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));
app.set('views', './src/views');
app.set('view engine', 'hbs' ) //verificar ruta

app.engine(
    'hbs',
     engine({
    extname: '.hbs', 
    defaultLayout: 'index.hbs',
    layoutsDir: __dirname + '/views/layout',
    partialsDir: __dirname + '/views/partials'
}));

app.get('/', (req, res) => {
    res.render('main', {
        usuarios,
        existe: true //false para ocultar en el html
    })
})

const PORT = 8080;
const server = app.listen(PORT, () =>
  console.log(`🚀 Server started on port http://localhost:${PORT}`),
);
server.on("error", (err) => console.log(err));