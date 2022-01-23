/*
Mestrado em Engenharia Informática e Tecnologia Web
Arquitetura e Padrões de Software
Author: Duarte Cota
Description: analytics module - declares methods to create and mantain analytics
*/

const mongoInstance = require('./dbconnections/mongoconnection')
const mongoConn =  mongoInstance.getconn()

const analyticsRequest = require("./models/analyticsModel")
const deployRequest = require("./models/deployModel")

const res = require('express/lib/response')
const {getdbname, checkquery, getqueries, gettruequery} = require ('./mysqlqueries')
const {Iterator} = require('./iterator')
const { sendFile } = require('express/lib/response')


//method to create document for analytics
function firstAccess(body,callback){
    analyticsRequest.find({'hash': {$eq: body._hash}})
    .exec()
    .then((data) => {
        if(data == 0){
            const newObj = new analyticsRequest({
                activityID: body.activityID,
                inveniraStdID: body.inveniraStdID,
                hash: body._hash,
                access : body.access,
                downloadApp : body.downloadApp,
                viewModel : body.viewModel,
                numQueries: body.numQueries,
                studentData: body.studentData
            })
            newObj.save()
            .then(result => {
                callback(result)
            })
            .catch(err => {
                res.json({message: err});
            })
        }
    })
}

//method to update analytics document
function updateanalytics(body,callback){
    console.log('entra')
    console.log(body._hash)
    console.log(body.interaction)
    if(body.interaction == 'downloadApp'){
        analyticsRequest.findOneAndUpdate({'hash': {$eq: body._hash}}, {$set: {'downloadApp':true}},{new:true})
        .exec()
        .then((data) => {
            if(data != []) {
                console.log('From database',data);
                callback({message:'Analytics updated'})
            }
            else{
                console.log('Object not found');
                callback({message:'Object not found'});
                
            }
        })
        .catch ((error) => {
            console.log(error);
            res.status(500).json({error: error});
        });
    }
    else if(body.interaction == 'viewModel'){
        console.log(body)
        analyticsRequest.findOneAndUpdate({'hash': {$eq: body._hash}}, {$set: {'viewModel':true}},{new:true})
        .exec()
        .then((data) => {
            if(data != []) {
                console.log('From database',data);
                callback({message:'Analytics updated'})
            }
            else{
                console.log('Object not found');
                callback({message:'Object not found'});
                
            }
        })
        .catch ((error) => {
            console.log(error);
            res.status(500).json({error: error});
        });
    }
    else if(body.interaction == 'valQuery') {
        const query = body.query
        const finalquery = query.replace(/\n/g,' ')
        checkquery(body.idBD,finalquery,(result)=>{
            console.log(result)
            gettruequery(body.idQueries,(truequery)=>{
                console.log(truequery[0].SQLcode)
                const tq = truequery[0].SQLcode.replace(/\n/g,' ')
                checkquery(body.idBD,tq,(trueres)=>{
                    console.log(trueres)
                    if(JSON.stringify(result)==JSON.stringify(trueres)){
                        let ob = {idQuery:body.idQueries,query:body.query, result:true}
                        analyticsRequest.findOneAndUpdate({'hash': {$eq: body._hash}}, {$push: {'studentData': ob}},{new:true})
                        .exec()
                        .then(() => {
                            console.log('igual')
                            callback({msg:'correto'})
                        })
                        .catch((error)=>{
                            console.log(error)
                            callback({msg:'erro'})
                        })    
                    }
                    else {
                        let ob = {idQuery:body.idQueries,query:body.query, result:false}
                        analyticsRequest.findOneAndUpdate({'hash': {$eq: body._hash}}, {$push: {'studentData': ob}},{new:true})
                        .exec()
                        .then(() => {
                            console.log('diferente')
                            callback({msg:'incorreto'})
                        })
                        .catch((error)=>{
                            console.log(error)
                            callback({msg:'erro'})
                        })
                    }
                })
            })
        })   
    }
}

//method to return analytics for activity
function returnanalytics(body,callback){
    analyticsRequest.find({'activityID': {$eq: body.activityID}})
    .exec()
    .then((data) => {
        const it = new Iterator(data)
        const numQueries = it.first().numQueries
        const maxIter = numQueries + 3
        let analytics = []
        it.each((item) => {
            let totalIter = 0
            let quanAnalytics = []
            let percQueryCorrect = 0
            if(item.access == true) totalIter += 1
            if(item.downloadApp == true) totalIter += 1
            if(item.viewModel == true) totalIter += 1
            //const totalAtempts = [...new Set(item.studentData.map(({idQuery})=>idQuery))].length
            const totalAtempts = item.studentData.length
            if(totalAtempts>0){
                percQueryCorrect = (getTrue(item.studentData)/numQueries)*100    
            } else percQueryCorrect = 0
            let obj = {'name': 'Acesso à atividade', 'value': item.access}
            quanAnalytics.push(obj)
            obj = {'name': 'Download app', 'value': item.downloadApp}
            quanAnalytics.push(obj)
            obj = {'name': 'Ver modelo de dados:', 'value': item.viewModel}
            quanAnalytics.push(obj)
            obj = {'name': 'Tentativas de resolução:', 'value': totalAtempts}
            quanAnalytics.push(obj)
            obj = {'name': 'Tentativas corretas:', 'value': getTrue(item.studentData)}
            quanAnalytics.push(obj)
            obj = {'name': 'Tentativas corretas (%):', 'value': percQueryCorrect.toFixed(2)}
            quanAnalytics.push(obj)
            obj = {'name': 'Progresso na atividade (%):', 'value': (((getTrue(item.studentData)+totalIter)/maxIter)*100).toFixed(2)}
            quanAnalytics.push(obj)
            obj = {
                'inveniraStdID': item.inveniraStdID, 
                'quantAnalytics': quanAnalytics,
                'qualAnalyticsURL': 'https://apds.duartecota.com/qualanalytics/?stdcode='+ item.hash
            }
            analytics.push(obj)
        })
        callback(analytics)     
    })
    .catch((error) => {
        callback(error)
    })
}

//method to return how many correct answers
function getTrue(item){
    let conta=0
    let result=[]
    let map = new Map()
    const it = new Iterator(item)
    it.each((item) => {
        if(!map.has(item.idQuery) && item.result==true){
            conta=conta+1;
            map.set(item.idQuery, true)
            result.push({
                idQuery: item.idQuery,
                result: item.result
            })
        }
    })
    return conta
}

module.exports = {firstAccess, updateanalytics, returnanalytics}