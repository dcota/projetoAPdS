/*
Mestrado em Engenharia Informática e Tecnologia Web
Arquitetura e Padrões de Software
Author: Duarte Cota
Description: files module - declares methods to return files from the system
*/

const path = require('path')

//method to send ER model image
function sendmodel(model,callback){
    const modelimage = path.join(__dirname,'./public/img/'+ model + '.png')
    callback(modelimage)
}

//method to send the zip file containing the desktop app for the activity
function sendapp(callback){
    const winapp = path.join(__dirname,'./dist/SQL_Train_1.0.0.exe')
    callback(winapp)
}

//method to send config interface HTML
function configinterface(callback){
    const configurl = path.join(__dirname,'./public/config.html')
    callback(configurl)
}

//mehtod to send deploy interface HTML
function deployinterface(callback){
    const deployurl = path.join(__dirname,'./public/deploy.html')
    callback(deployurl)
}

module.exports = {sendmodel, sendapp, configinterface, deployinterface}