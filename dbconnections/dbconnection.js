/*
Mestrado em Engenharia Informática e Tecnologia Web
Arquitetura e Padrões de Software
Tópico 4 - semana 2/3 (padrões de criação)
Author: Duarte Cota
Description: MySQL connection using Singleton pattern
*/

const mysql = require('mysql2')
require('dotenv').config({ path: './private/.env' })

class DBConnection1 {
    constructor(){
     if(! DBConnection1.instance){
        const connection = mysql.createConnection({
            host: process.env._HOST,
            user: process.env._USER,
            password: process.env._PASSWORD,
            database: process.env._DATABASE1,
            port: process.env._PORT   
        })
        connection.connect((err)=>{
            if(err){
                throw err;
            }
            else {
                console.log('Connected to database ' + process.env._DATABASE1)
            }
        })
       this.conn=connection
     }
     return DBConnection1.instance
    } 

    getconn(){
        return this.conn
    } 
}

const instance1 = new DBConnection1();

Object.freeze(instance1)

module.exports = instance1