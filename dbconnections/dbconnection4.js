/*
Mestrado em Engenharia Informática e Tecnologia Web
Arquitetura e Padrões de Software
Tópico 4 - semana 2/3 (padrões de criação)
Author: Duarte Cota
Description: MySQL connection using Singleton pattern
*/

const mysql = require('mysql2')
require('dotenv').config({ path: './private/.env' })


class DBConnection4 {
    constructor(){
     if(! DBConnection4.instance){
        const connection = mysql.createConnection({
            host: process.env._HOST,
            user: process.env._USER,
            password: process.env._PASSWORD,
            database: process.env._DATABASE4,
            port: process.env._PORT   
        })
        connection.connect((err)=>{
            if(err){
                throw err;
            }
            else {
                console.log('Connected to database ' + process.env._DATABASE4)
            }
        })
       this.conn=connection
     }
     return DBConnection4.instance
    } 

    getconn(){
        return this.conn
    } 
}


const instance4 = new DBConnection4();

Object.freeze(instance4)

module.exports = instance4