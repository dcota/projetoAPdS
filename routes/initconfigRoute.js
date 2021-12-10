/*
Mestrado em Engenharia Informática e Tecnologia Web
Arquitetura e Padrões de Software
Tópico 4 - semana 2/3 (padrões de criação)
Author: Duarte Cota
File: middleware route for getting training databases
*/

const express = require('express')
const initconfig = express.Router()
const instance = require('../DBconnection')
const conn =  instance.getconn() 

initconfig.get('/', (req,res) => {
   conn.query('SELECT * FROM bd', (err,result) => {
        if(err){
            console.log('Erro na base de dados...')
        }
        else {
            res.json(result)
        }
    })
})

module.exports = initconfig