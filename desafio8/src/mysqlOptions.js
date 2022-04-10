
const mysqlOptions = {
    client: 'mysql',
    connection:{
        host:'127.0.0.1',
        port:3306,
        user:'root',
        database:'ecommerce'
    },
    
    pool:{min:2, max:8}
}

module.exports = { mysqlOptions }