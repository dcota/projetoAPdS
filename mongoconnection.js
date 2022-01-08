/*
Mestrado em Engenharia Informática e Tecnologia Web
Arquitetura e Padrões de Software
Author: Duarte Cota
Description: MongoDB connection using Singleton pattern
*/

const mongodb = require('mongoose')
require('dotenv').config({ path: './private/.env' })

class MongoConnection {
    constructor(){
     if(! MongoConnection.mongoInstance){
        const connection = mongodb.connect(process.env.MONGOURL, {useNewUrlParser: true, useUnifiedTopology: true}, (err)=>{
            if(err){
                throw err;
            }
            else {
                console.log('Connected to MongoDB')
            }
        })
       this.conn=connection
     }
     return MongoConnection.mongoInstance
    } 

    getconn(){
        return this.conn
    } 
}

const mongoInstance = new MongoConnection();
Object.freeze(mongoInstance)
module.exports = mongoInstance