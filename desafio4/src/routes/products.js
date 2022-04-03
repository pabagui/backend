//import express, {Router, json} from 'express'
//import Container from '../containers/container.js'
const express = require('express')
const { Container } = require('../containers/container.js')
const { Router, json } = require('express')

const admin = true


const productContainer = new Container('./src/containers/products.txt') 


const products = Router()

products.use(json()); //probar si se usa

/*
products.use(express.urlencoded({extended: true}))
products.use(express.static('public'))
products.use(express.json())
*/

products.get('/', async (req, res) => {
    res.json(await productContainer.getAll())
})

products.get('/:id', async (req, res) => {
    const {id} = req.params;
    res.json(await productContainer.getById(id))
})

products.post('/',async (req, res) => {
    if (admin){
        
        const product = {
            timeStamp: Date.now(),
            name: req.body.name,
            description: req.body.description,
            ean: req.body.ean, 
            thumbnail:req.body.thumbnail,
            price: req.body.price,
            stock: req.body.stock
        }
        console.log(product)
        await productContainer.save(product).catch(err => res.sendStatus(500))
        res.sendStatus(200)
    }else{
        res.send('Acceso solo a administrador')
    }
})

products.put('/:id', async (req, res) =>{
    if(admin){
        const {id} = req.params;
        const product = {
            timeStamp: Date.now(),
            name: req.body.name,
            description: req.body.description,
            ean: req.body.ean,
            thumbnail:req.body.thumbnail,
            price:req.body.price,
            stock:req.body.stock
        }
        await productContainer.editById(id, product)
        .then(() => res.sendStatus(200))
        .catch((err) => res.sendStatus(500))
    }else{
        res.send('Acceso solo a administrador')
    }    
})

products.delete('/:id', async (req, res) =>{
    if (admin){
        const {id} = req.params
        await productContainer.deleteById(id)
        .then(() => res.sendStatus(200))
        .catch(() => res.sendStatus(500))
    }else{
        res.send('Acceso solo a administrador')
    }
})



exports.products = products
