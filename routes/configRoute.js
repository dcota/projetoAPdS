/*
Mestrado em Engenharia Informática e Tecnologia Web
Arquitetura e Padrões de Software
Tópico 4 - semana 2/3 (padrões de criação)
Author: Duarte Cota
File: middleware route for getting configuration interface
*/

const express = require('express')
const path = require('path')
const configRoute = express.Router()

configRoute.get('/', async (req,res) => {
    const obj = { response : 'URL to configuration interface'}
    res.sendFile(path.join(__dirname,'../public/config.html'))
})

module.exports = configRoute