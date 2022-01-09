/*
Mestrado em Engenharia Informática e Tecnologia Web
Arquitetura e Padrões de Software
Tópico 4 - semana 2/3 (padrões de criação)
Author: Duarte Cota
Description: MySQL connection using Singleton pattern
*/

const mysql = require('mysql2')
require('dotenv').config({ path: './private/.env' })

class DBConnection {
    constructor(){
     if(! DBConnection.instance){
        const connection = mysql.createConnection({
            host: process.env._HOST,
            user: process.env._USER,
            password: process.env._PASSWORD,
            database: process.env._DATABASE,
            port: process.env._PORT   
        })
        connection.connect((err)=>{
            if(err){
                throw err;
            }
            else {
                console.log('Connected to database ' + process.env._DATABASE)
            }
        })
       this.conn=connection
     }
     return DBConnection.instance
    } 

    getconn(){
        return this.conn
    } 
}

const instance = new DBConnection();
Object.freeze(instance)
module.exports = instance