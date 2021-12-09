/*
Mestrado em Engenharia Informática e Tecnologia Web
Arquitetura e Padrões de Software
Tópico 4 - semana 2/3 (padrões de criação)
Author: Duarte Cota
File: middleware route for getting activity analytics
*/

const express = require('express');
const path = require('path')
const analyticsRoute = express.Router();

analyticsRoute.get('/', async (req,res) => {
    if(!req.body){
        const obj = { response : 'some analytics...'}
        res.json(obj)
    }
    else {
        res.sendFile(path.join(__dirname, '../public/dummy.json'));
    }
});

module.exports = analyticsRoute;