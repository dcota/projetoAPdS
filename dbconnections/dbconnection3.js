/*
Mestrado em Engenharia Informática e Tecnologia Web
Arquitetura e Padrões de Software
Tópico 4 - semana 2/3 (padrões de criação)
Author: Duarte Cota
Description: MySQL connection using Singleton pattern
*/

const mysql = require('mysql2')
require('dotenv').config({ path: './private/.env' })


class DBConnection3 {
    constructor(){
     if(! DBConnection3.instance){
        const connection = mysql.createConnection({
            host: process.env._HOST,
            user: process.env._USER,
            password: process.env._PASSWORD,
            database: process.env._DATABASE3,
            port: process.env._PORT   
        })
        connection.connect((err)=>{
            if(err){
                throw err;
            }
            else {
                console.log('Connected to database ' + process.env._DATABASE3)
            }
        })
       this.conn=connection
     }
     return DBConnection3.instance
    } 

    getconn(){
        return this.conn
    } 
}


const instance3 = new DBConnection3();

Object.freeze(instance3)

module.exports = instance3