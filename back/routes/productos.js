import express from 'express'
import { productController } from '../controllers/classController.js'

const productsRouter = express.Router()

export const admin = true

productsRouter.get('/:id?', async (req, res) => {
  const { id } = req.params

  if (typeof id === 'undefined') {
    const fileContent = await productController.getAll()
    return res.json(fileContent)
  }

  const fileContent = await productController.getById(Number(id))
  return res.json(fileContent)
})

productsRouter.post('/', async (req, res) => {
  if (!admin)
    return res
      .status(401)
      .json({
        error: -1,
        description: `ruta ${req.originalUrl} método ${req.method} no Autorizado`,
      })
      .end()

  const { body } = req
  const newProduct = await productController.saveProduct(body)

  res.json({ status: 'producto agregado', newProduct })
})

productsRouter.delete('/:id', async (req, res) => {
  if (!admin)
    return res
      .status(401)
      .json({
        error: -1,
        description: `ruta ${req.originalUrl} método ${req.method} no Autorizado`,
      })
      .end()

  const { id } = req.params
  await productController.removeById(Number(id))

  res.json({ status: 'producto eliminado' })
})

productsRouter.put('/:id', async (req, res) => {
  if (!admin)
    return res
      .status(401)
      .json({
        error: -1,
        description: `ruta ${req.originalUrl} método ${req.method} no Autorizado`,
      })
      .end()

  const { id } = req.params
  const { body } = req

  await productController.updateById(Number(id), body)
  res.json({ status: 'updated' })
})

export default productsRouter