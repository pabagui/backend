# Desafío 5: motores de plantillas

en primer lugar prefiero pug porque tiene una configuración más sencilla y son menos los pasos para construir las páginas,
en segundo ejs ya que si bien es sencilla la configuración, despues la sintaxis en un poco engorrosa, 
en tercer lugar handlebars por todos los detalles de configuración

Librerías y/o frameworks utilizados:
"express": "^4.17.3",
"express-handlebars": "^6.0.3",
"pug": "^3.0.2"
"ejs": "^3.1.6"
       
Scripts:
"hbl": "nodemon --inspect ./src/server.js",
"pug": "nodemon --inspect ./src/server.js",


El objetivo es crear una formulario que permite ingresar datos de productos para ser guardados en un catálogo de productos

Se utilizó npm para instalar e inicializarlo

Demo: http://localhost:8081 (handlebars),
      http://localhost:8082 (pug),
      http://localhost:8083 (ejs)

Nota: para subir fotos de productos se pueden usar las URL del archivo productos.json