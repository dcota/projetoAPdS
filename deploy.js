/*
Mestrado em Engenharia Informática e Tecnologia Web
Arquitetura e Padrões de Software
Author: Duarte Cota
File: deploy module - declares methods to handle deploy requests
*/

const mongoInstance = require('./dbconnections/mongoconnection')
const {getqueriesdescription} = require ('./mysqlqueries')
const mongoConn =  mongoInstance.getconn()
const sha1 = require('sha1')
const deployRequest = require("./models/deployModel")

//method to make the activity deploy url
function getdeployurl(body,callback) {
    deployRequest.find({'activityID': {$eq: body.activityID}, 'inveniraStdID': {$eq: body.inveniraStdID}})
    .exec()
    .then((data) => {
        if (data == 0) {
            const strtohash = body.activityID+body.inveniraStdID
            const hash = sha1(strtohash)
            const deployRequestObject = new deployRequest({
                activityID: body.activityID,
                inveniraStdID: body.inveniraStdID,
                json_params : body.json_params,
                hash : hash
            });
            deployRequestObject.save()
            .then ( result => {
                console.log(result)
                var obj = {"deployURL":"http://localhost:3000/deploy/?inveniraStdID=" + body.inveniraStdID + "&activityID=" + body.activityID }
                callback(obj);
                console.log('Activity created');
            })
            .catch(err => {
                callback(err);
                console.log(err);
            });
        }
        else {
                var obj = {"deployURL":"http://localhost:3000/deploy/?inveniraStdID=" + body.inveniraStdID + "&activityID=" + body.activityID }
                callback(obj);
                console.log('Existing activity');       
        }
    })
}

//method to get the activity data from database
function getdeploydata(body,callback){
    deployRequest.findOne({'_hash': {$eq: body._hash}})
    .exec()
    .then ( data =>  {
        console.log("From database",data);
        if(data!=0) {
            let arr = ''
            for(i in data.json_params.selectedQueries ){
                if(i<data.json_params.selectedQueries.length-1)
                    arr += data.json_params.selectedQueries[i].idQueries + ','
                else
                arr += data.json_params.selectedQueries[i].idQueries
            }
            console.log(arr)
            getqueriesdescription(arr,(result)=>{
                const obj =  {
                    summary: data.json_params.summary,
                    idBD: data.json_params.selectedBd,
                    texto: result[0]
                }
                callback(obj)
            })
        }
        else{
           callback(null)
        }
    })
    .catch ((error) => {
        callback(error)
    });
}

//method to get the student hash code for authentication
function getstdcode(body,callback){
    console.log(body)
    deployRequest.findOne({'activityID': {$eq: body.activityID}, 'inveniraStdID': {$eq: body.inveniraStdID}})
    .exec()
    .then ((data) => {
        console.log("From database",data);
        if(data!=0) {
            const ob = {
                _hash: data.hash,
                numQueries: data.json_params.selectedQueries.length
            }
            console.log(data.json_params.selectedQueries.length)
            callback(ob);
        }
        else{
           callback(null)
        }
    })
    .catch ((err) => {
        callback(err)
    });
}


module.exports = {getdeployurl, getdeploydata, getstdcode}