/*
Mestrado em Engenharia Informática e Tecnologia Web
Arquitetura e Padrões de Software
Tópico 4 - semana 2/3 (padrões de criação)
Author: Duarte Cota
File: middleware route for activity deploy
*/

const express = require('express')
const deployRoute = express.Router()

deployRoute.post('/', (req,res) => {
    const obj = {
        deployURL:'URL with activityID and inveniraStdID'
    }
    res.json(obj)
})

module.exports = deployRoute