import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import productsRouter from './routes/productos.js'
import cartRouter from './routes/carrito.js'

const app = express()
const port = process.env.PORT || 8080

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

app.get('/', (req, res) => {
  res.send('probando servidor');
})
app.post('/post', (req, res) => {
  console.log('conectado a React');
  res.redirect('/');
})

app.use('/api/productos', productsRouter)
app.use('/api/carrito', cartRouter)

app.all('*', (req, res) => {
  res.status(501).json({ error: -2, description: `Ruta ${req.originalUrl}, method ${req.method} no implementada` })
})

app.listen(port, () => {
  console.log(`😃servidor iniciado en el puerto http://localhost:${port}`)
})