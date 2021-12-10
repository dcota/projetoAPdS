/*
Mestrado em Engenharia Informática e Tecnologia Web
Arquitetura e Padrões de Software
Tópico 4 - semana 2/3 (padrões de criação)
Author: Duarte Cota
File: middleware route for getting activity analytics
*/

const express = require('express')
const analyticsRoute = express.Router()

analyticsRoute.post('/', (req,res) => {
    let obj = {
        response: 'Analytics for activity with ID = ' + req.body.activityID
    }
    res.json(obj)
})

module.exports = analyticsRoute             