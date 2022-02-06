/*
Mestrado em Engenharia Informática e Tecnologia Web
Arquitetura e Padrões de Software
Tópico 4 - semana 2/3 (padrões de criação)
Author: Duarte Cota
File: middleware route for getting queries from database
*/

const express = require('express')
const getqueries = express.Router()
const instance = require('../DBconnection')
const conn =  instance.getconn() 

getqueries.post('/', (req,res) => {
    conn.query('SELECT * FROM queries WHERE idBd = ?',
    [req.body.id],
    (err,result) => {
        if(err){
            console.log('Erro na base de dados...')
        }
        else {
            res.json(result)
        }
    })

})

module.exports = getqueries