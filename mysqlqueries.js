/*
Mestrado em Engenharia Informática e Tecnologia Web
Arquitetura e Padrões de Software
Author: Duarte Cota
Description: mysql module - get queries from MySQL database
*/

const instance = require ('./dbconnection')
const MySQLconn =  instance.getconn()

//method to get all databases for the configuration
function  getdbs(callback){
     MySQLconn.query('SELECT * FROM bd', (err, result) => {
        if (err) {
            callback(err)
        }
        else {
            callback(result);
        }
    })
}

//method to get the queries for a specific database
function getqueries(body,callback){
    MySQLconn.query('SELECT * FROM queries WHERE idBd = ?',
    [body.id],
    (err,result) => {
        if(err){
            callback(err)
        }
        else {
            callback(result)
        }
    })
}

//method to get the queries description
function getqueriesdescription (arr,callback) {
                MySQLconn.query('CALL getQueriesDesc(?)',
                [arr],
                (err,result) => {
                    if(err)
                        console.log(err)
                    else {
                        callback(result)  
                    }
                })
            }


module.exports = {getdbs,getqueries,getqueriesdescription}