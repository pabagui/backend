import express from 'express'
import { cartController } from '../controllers/classController.js'
import { admin } from './productos.js'

const cartRouter = express.Router()

cartRouter.get('/:id/productos', async (req, res) => {
  const { id } = req.params
  const products = await cartController.getCart(Number(id))
  products ? res.json({ products }) : res.status(404).json({ status: 'carrito no encontrado' })
})

cartRouter.post('/', async (req, res) => {
  const result = await cartController.saveCart()
  res.json({ id_cart: result })
})

cartRouter.post('/:id/productos', async (req, res) => {
  const { id } = req.params
  const { body } = req
  await cartController.saveProdInCart(Number(id), body)
  res.json({ status: 'producto agregado a carrito' })
})

cartRouter.delete('/:id', async (req, res) => {
  const { id } = req.params
  await cartController.removeCart(Number(id))
  res.json({ status: 'carrito eliminado' })
})

cartRouter.delete('/:id/productos/:id_prod', async (req, res) => {
  const { id, id_prod } = req.params
  const resultado = await cartController.removeProdInCart(Number(id), Number(id_prod))

  if (!resultado) return res.status(404).json({ status: 'id no encontrado' })

  res.json({ status: 'producto eliminado del carrito' })
})

export default cartRouter