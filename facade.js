/*
Mestrado em Engenharia Informática e Tecnologia Web
Arquitetura e Padrões de Software
Author: Duarte Cota
Description: implementation of class Facade
*/

//instanciate methods as objects from subsystem modules
const {getdbs, getqueries} = require ('./mysqlqueries')
const {getdeployurl, getdeploydata, getstdcode} = require ('./deploy');
const {sendmodel, sendapp, configinterface, deployinterface} = require ('./files')
const {firstAccess, updateanalytics} = require ('./analytics');

//declaring class Facade
class Facade {
    constructor(){
    }
    //process the request and send response to client
    processRequest(req,res){
        let method = req.method
        let path = req.path
        if(method == 'GET' && path == '/config'){
            configinterface((url) => {
                res.sendFile(url)
            })
        }
        else if(method == 'GET' && path == '/initconfig'){ 
            getdbs((dbs) => {
                res.json(dbs)
            })
        }
        else if(method == 'POST' && path == '/getqueries'){
            getqueries(req.body, (queries) => {
                res.json(queries)
            })
        }
        else if(method == 'POST' && path == '/getmodel'){
            sendmodel(req.body.id, (modelimage) => {
                res.sendFile(modelimage)
            })
        }
        else if(method == 'POST' && path == '/deploydata'){
            getdeploydata(req.body, (data) => {
                res.json(data)
            })
        }
        else if(method == 'POST' && path == '/deploy'){
            getdeployurl(req.body, (url) => {
                res.json(url)
            })
        }
        else if(method == 'GET' && path == '/deploy/'){
            deployinterface((deployurl) => {
                res.sendFile(deployurl)
            })
        }
        else if(method == 'POST' && path == '/deployCode'){
            console.log(req.body)
            getstdcode(req.body, (hash) => {
                res.json(hash)
            })
        }
        else if(method == 'POST' && path == '/accessDeploy'){
            firstAccess(req.body, (msg) => {
                res.json(msg)
            })
        }
        else if(method == 'GET' && path == '/getapp'){
            sendapp((appfile) => {
                res.download(appfile)
            })
        }
        else if(method == 'PUT' && path == '/updateanalytics'){
            updateanalytics(req.body, (msg) => {
                res.json(msg)
            })
        }    
    }
}

module.exports={Facade}