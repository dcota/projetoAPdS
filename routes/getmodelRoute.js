/*
Mestrado em Engenharia Informática e Tecnologia Web
Arquitetura e Padrões de Software
Tópico 4 - semana 2/3 (padrões de criação)
Author: Duarte Cota
File: middleware route for getting database model ER image
*/

const express = require('express');
const path = require('path')
const getmodel = express.Router();

getmodel.get('/:image', (req,res) => {
    res.sendFile(path.join(__dirname,'../public/img/'+ req.params.image + '.png')) 
})
module.exports = getmodel