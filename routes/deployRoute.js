/*
Mestrado em Engenharia Informática e Tecnologia Web
Arquitetura e Padrões de Software
Tópico 4 - semana 2/3 (padrões de criação)
Author: Duarte Cota
File: middleware route for activity deploy
*/

const express = require('express');
const path = require('path')
const deployRoute = express.Router();

deployRoute.get('/', async (req,res) => {
    if(!req.body){
        const obj = { response : 'URL to deploy interface'}
        res.json(obj)
    }
    else {
        const obj = req.body
        res.json(obj)
    }
});

module.exports = deployRoute;