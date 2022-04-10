//require('dotenv').config();



const knex = require('knex')({
    client: 'mysql',
    connection:{
        host:'127.0.0.1',
        port:3306,
        user:'root',
        database:'ecommerce'
    },
    
    pool:{min:2, max:8}
});



class Database {
    created = false
    constructor(knex, tableName){
        this.db = knex
        this.tableName = tableName
    }
    createTable(){
        if(this.tableName === 'mensajes'){
            this.db.schema.createTableIfNotExists('mensajes', table =>{
                table.increments('id').primary()
                table.string('mail')
                table.datetime('fecha')
                table.string('mensaje')              
            })
            .then((res)=> {
                console.log("Tabla de mensajes creada")
            }).catch((err)=> {
                console.log(err)
            })
        }

        else if (this.tableName === 'products'){
            this.db.schema.createTableIfNotExists('products', table => {
                table.increments('id').primary()
                table.string('title')
                table.integer('price')
                table.string('thumbnail')

            })
            .then((res)=> {
                console.log("Tabla de productos creada")
            }).catch((err)=> {
                console.log(err)
            })       
        }
    }
    
    /*
    async save(object){
        try{
            const currentTime = new Date().toISOString()
            object.fecha = currentTime.replace('T', ' ').replace('Z', ' ')
            await this.db(this.tableName).insert(object)
        }
        catch(err){
            console.log(err)
        }
    }
*/
    async getAll() {
        return await this.db(this.tableName).select('*')
        .then(rows => rows.map((obj) => {
            return obj
        }))
    }


}



module.exports = {Database}

/*
knex.schema.createTableIfNotExists("products", (table)=> {
    table.increments("id").primary(),
    table.string("title"),
    table.integer("price"),
    table.string("thumbnail")
}).then((res)=> {
    console.log("Tabla creada")
}).catch((err)=> {
    console.log(err)
})

*/

