/*
Mestrado em Engenharia Informática e Tecnologia Web
Arquitetura e Padrões de Software
Author: Duarte Cota
Description: implementation of class Facade
*/

//instanciate methods as objects from subsystem modules
const {getdbs, getqueries} = require ('./mysqlqueries')
const {getdeployurl, getdeploydata, getstdcode} = require ('./deploy');
//before refactoring
/*const {sendmodel, sendapp, configinterface, deployinterface} = require ('./files')*/
const {firstAccess, updateanalytics, returnanalytics, detailedAnalytics} = require ('./analytics');
const filePath = require('path')

//declaring class Facade
class Facade {
    constructor(){
    }
    //process the request and send response to client
    processRequest(req,res){
        let method = req.method
        let path = req.path
        if(method == 'GET' && path == '/config'){
            //code before refactoring
            /*configinterface((url) => {
                res.sendFile(url)
            })*/

            //code after first refactorization 
            /*sendFile('./public/config.html',(file)=>{
                res.sendFile(file)
            })
            */

            //final code after second refactorization
            res.sendFile(filePath.join(__dirname,'./public/config.html'))
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
            //code before refactoring
            /*sendmodel(req.body.id, (modelimage) => {
                res.sendFile(modelimage)
            })*/

            //code after first refactorization 
            /*sendFile('./public/img/'+ req.body.id + '.png',(file)=>{
                res.sendFile(file)
            })*/

            //final code after second refactorization
            res.sendFile(filePath.join(__dirname,'./public/img/'+ req.body.id + '.png'))

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
            //code before refactoring
            /*deployinterface((deployurl) => {
                res.sendFile(deployurl)
            })*/

            //code after first refactorization 
            /*sendFile('./public/deploy.html',(file)=>{
                res.sendFile(file)
            })*/

            //final code after second refactorization
            res.sendFile(filePath.join(__dirname,'./public/deploy.html'))
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
            //code before refactoring
            /*sendapp((appfile) => {
                res.download(appfile)
            })
            })*/

            //code after first refactorization 
            /*sendFile('./dist/SQL_Train_1.0.0.exe',(file)=>{
                res.sendFile(file)
            })*/

            //final code after second refactorization
            res.sendFile(filePath.join(__dirname,'./dist/SQL_Train_1.0.0.exe'))
        }
        else if(method == 'PUT' && path == '/updateanalytics'){
            updateanalytics(req.body, (msg) => {
                res.json(msg)
            })
        }    
        else if(method == 'POST' && path == '/analytics'){
            returnanalytics(req.body, (analytics) => {
                res.json(analytics)
            })
        }
        else if(method == 'GET' && path == '/qualanalytics/'){
            res.sendFile(filePath.join(__dirname,'./public/detailedAnalytics.html'))
        }
        else if(method == 'POST' && path == '/detailedanalytics'){
            detailedAnalytics(req.body, (analytics) => {
                console.log(analytics)
                res.json(analytics)
            })
        }
    }
}

module.exports={Facade}