/*
Mestrado em Engenharia Informática e Tecnologia Web
Arquitetura e Padrões de Software
Author: Duarte Cota
Description: main file, implements Facade pattern
*/

//imports core modules
const express = require('express');
const app = express()

//defines public static folder
app.use(express.static('./public'))

//using json
app.use(express.urlencoded({ extended: true }))
app.use(express.json({ extended: false }))

/*all methods from all modules available here if needed*/
const {getdbs, getqueries} = require ('./mysqlqueries')
const {getdeployurl, getdeploydata, getstdcode} = require ('./deploy');
const {sendmodel, sendapp, configinterface, deployinterface} = require ('./files')
const {firstAccess, updateanalytics} = require ('./analytics');

//*************** implements facade pattern ************************* */

//instanciate facade object
const {Facade} = require ('./facade')
const facade = new Facade()

//calls facade method that deals with the requests
app.use('/', (req, res) => {
    facade.processRequest(req,res)
})

//*************** end of facade pattern implementation ******************* */

 //defines local port and starts the server
app.listen(3000)