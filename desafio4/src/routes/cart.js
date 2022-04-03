//import express, {Router} from 'express'
//import { productContainer } from './products.js'
//import Container from '../containers/container.js'
const express = require('express')
const { Router , json } = require('express')
const { productContainer } = require('./products.js')
const { Container } = require('../containers/container.js')


const carts = new Container('./src/containers/cart.txt')


const cart = Router()
 
/*
cart.use(express.urlencoded({extended: true}))
cart.use(express.static('public'))
cart.use(express.json())
*/
cart.use(json()) //probar si se usa

cart.post('/', async (req, res) =>{
    const cart = {
        timeStamp: Date.now(),
        products:[],
    }
    const id = await carts.save(cart)
    console.log(id)
    res.json(id)
})

cart.delete('/:id',async (req, res) =>{
    const {id} = req.params
    await carts.deleteById(id)
    .then(() => res.sendStatus(200))
    .catch(() => res.sendStatus(500))
    
})

cart.get('/:id/productos', async (req,res) =>{
    const {id} = req.params
    
    const cart = await carts.getById(id)
    res.json(cart.products)
})

cart.post('/:id/productos', async (req, res) =>{
    const id_prod = req.body.id
    const product = await productContainer.getById(id_prod)
    const {id} = req.params
    const cart = await carts.getById(id)
    cart.product.push(product)
    await carts.editById(id, cart)
    .then(()=>res.sendStatus(200))
    .catch(()=>res.sendStatus(500))
})

cart.delete('/:id/productos/:id_prod' , async (req, res) =>{
    const {id, id_prod} = req.params
    const cart = await carts.getById(id)
    await carts.editById(id, cart)
    .then(() => res.sendStatus(200))
    .catch(() => res.sendStatus(500))
})


exports.cart = cart