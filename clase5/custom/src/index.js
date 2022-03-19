const express = require('express')
const fs = require('fs')

const app = express()
app.use(express.json()); //para usar con POST
app.use(express.urlencoded({extended: true})); //para usar con POST


//todo esto es para pasar una plantilla tipo custom:
app.set('views', '.clase5/custom/src/views'); //1° buscar el archivo en esta ruta

/*
app.set('view engine', 'ntl');  //3° le pone la extensión ntl
app.engine('ntl', (filePath, options, callback) => {
    fs.readFile(filePath, (err, content) => {
        if(err) return callback(new Error(err));
        const render = content
            .toString()
            .replace('#title#', options.title)
            .replace('#message#', options.message)
        return callback(null, render)    
    })
})

app.get('/', (req, res) => {
    res.render('index1', {   // 2° este es el archivo que busca
        title: 'este es el título 1',
        message: 'este es un mensaje 2'
    }) 
})
*/

 app.set("view engine", "ntl");

 app.engine("ntl", (filePath, options, callback) => {
   fs.readFile(filePath, (err, content) => {
     if (err) return callback(new Error(err));
     const render = content
       .toString()
       .replace("#title#", options.title)
       .replace("#message#", options.message);
     return callback(null, render);
   });
 });

 app.get("/", (req, res) => {
   res.render("index1", {
     title: "Este es el titulo 1",
     message: "Este es un mensaje 2",
   });
 });




const PORT = 8080;
const server = app.listen(PORT, () => {
    console.log(`😃 Server started on http:localhost:${PORT}`)
});
server.on('error', (err) => console.log(err));