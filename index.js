/*
Mestrado em Engenharia Informática e Tecnologia Web
Arquitetura e Padrões de Software
Tópico 4 - semana 2/3 (padrões de criação)
Author: Duarte Cota
File: main webserver file
*/

const express = require('express')
const app = express()

app.use(express.static('./public'))

app.use(express.urlencoded({ extended: true }))
app.use(express.json({ extended: false }))

//define routes middleware
app.use('/config', require('./routes/configRoute'))
app.use('/deploy',require('./routes/deployRoute'))
app.use('/analytics',require('./routes/analyticsRoute'))
app.use('/initconfig',require('./routes/initconfigRoute'))
app.use('/getqueries',require('./routes/getqueriesRoute'))
app.use('/getmodel',require('./routes/getmodelRoute'))
 
app.listen()