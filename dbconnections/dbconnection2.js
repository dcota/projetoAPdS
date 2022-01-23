/*
Mestrado em Engenharia Informática e Tecnologia Web
Arquitetura e Padrões de Software
Tópico 4 - semana 2/3 (padrões de criação)
Author: Duarte Cota
Description: MySQL connection using Singleton pattern
*/

const mysql = require('mysql2')
require('dotenv').config({ path: './private/.env' })


class DBConnection2 {
    constructor(){
     if(! DBConnection2.instance){
        const connection = mysql.createConnection({
            host: process.env._HOST,
            user: process.env._USER,
            password: process.env._PASSWORD,
            database: process.env._DATABASE2,
            port: process.env._PORT   
        })
        connection.connect((err)=>{
            if(err){
                throw err;
            }
            else {
                console.log('Connected to database ' + process.env._DATABASE2)
            }
        })
       this.conn=connection
     }
     return DBConnection2.instance
    } 

    getconn(){
        return this.conn
    } 
}


const instance2 = new DBConnection2();

Object.freeze(instance2)

module.exports = instance2