const express = require('express');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('views', './src/views');
app.set('view engine', 'pug');

const productos = [
    {title:"Cavancha",
    price:55000,
    thumbnail:"https://i.ibb.co/9v9TrJ0/naranjo.jpg",
    },
    {title:"Bombín",
    price:45000,
    thumbnail:"https://i.ibb.co/9NsMW2N/negro.jpg",
    },
    {title:"Aroma",
    price:50000,
    thumbnail:"https://i.ibb.co/DGr0LVV/amarillo.jpg"
    }
];


app.get('/', (req, res) => {
  res.render('cargarProducto', {
    productos //probando
  })
});

app.get('/productos', (req, res) => {
  res.render('verProductos', {
      productos
  })
});

app.post('/productos', (req, res) => {
  const { body } = req;
  productos.push(body);
  res.render('verProductos', {
    productos
  })
});

const PORT = 8082;
const srv = app.listen(PORT, () => {
    console.log(`🚀 Servidor http escuchando en http://localhost:${PORT}`);
});
srv.on('error', (error) => console.log(`Error en servidor ${error}`));
