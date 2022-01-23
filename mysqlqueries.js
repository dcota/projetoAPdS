/*
Mestrado em Engenharia Informática e Tecnologia Web
Arquitetura e Padrões de Software
Author: Duarte Cota
Description: mysql module - get queries from MySQL database
*/

const instance1 = require ('./dbconnections/dbconnection')
const instance3 = require ('./dbconnections/dbconnection3')
const instance4 = require ('./dbconnections/dbconnection4')

const MySQLconn1 =  instance1.getconn()
const MySQLconn3 =  instance3.getconn()
const MySQLconn4 =  instance4.getconn()



//method to get all databases for the configuration
function  getdbs(callback){
     MySQLconn1.query('SELECT * FROM bd', (err, result) => {
        if (err) {
            callback(err)
        }
        else {
            callback(result);
        }
    })
}

function getdbname(body,callback){
    MySQLconn1.query('SELECT nome FROM bd WHERE idBd = ?', 
    [body.idBD],
    (err, result) => {
        if (err) {
            callback(err)
        }
        else {
            callback(result);
        }
    })
}

function checkquery(id,query,callback){
    if(id==1){
        MySQLconn3.query(query,
            (err, result) => {
                if (err) {
                    callback(err)
                }
                else {
                    callback(result);
                }
            })
    }
    else if(id==2){
        MySQLconn4.query(query,
            (err, result) => {
                if (err) {
                    callback(err)
                }
                else {
                    callback(result);
                }
            })
    }
}

function gettruequery(id,callback){
    MySQLconn1.query('SELECT SQLcode FROM queries WHERE idQueries = ?',
    [id],
    (err, result) => {
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
    MySQLconn1.query('SELECT * FROM queries WHERE idBd = ?',
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
                MySQLconn1.query('CALL getQueriesDesc(?)',
                [arr],
                (err,result) => {
                    if(err)
                        console.log(err)
                    else {
                        callback(result)  
                    }
                })
            }


module.exports = {getdbs, getdbname, getqueries, getqueriesdescription, checkquery, gettruequery}