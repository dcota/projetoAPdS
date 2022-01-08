/*
Mestrado em Engenharia Informática e Tecnologia Web
Arquitetura e Padrões de Software
Author: Duarte Cota
Description: analytics module - declares methods to create and mantain analytics
*/

const mongoInstance = require('./mongoconnection')
const mongoConn =  mongoInstance.getconn()

const analyticsRequest = require("./models/analyticsModel")

//method to create document for analytics
function firstAccess(body,callback){
    analyticsRequest.find({'hash': {$eq: body._hash}})
    .exec()
    .then((data) => {
        if(data == 0){
            const newObj = new analyticsRequest({
                //activityID: req.body.activityID,
                //inveniraStdID: req.body.inveniraStdID,
                hash: body._hash,
                access : body.access,
                downloadApp : body.downloadApp,
                viewModel : body.viewModel,
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
    if(body.interaction=='downloadApp'){
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
}

module.exports = {firstAccess, updateanalytics}