/*
>> Consigna: Implementar programa que contenga una clase llamada Contenedor que reciba el nombre del archivo con el que va a trabajar e implemente los siguientes métodos:

save(Object): Number - Recibe un objeto, lo guarda en el archivo, devuelve el id asignado.
getById(Number): Object - Recibe un id y devuelve el objeto con ese id, o null si no está.
getAll(): Object[] - Devuelve un array con los objetos presentes en el archivo.
deleteById(Number): void - Elimina del archivo el objeto con el id buscado.
deleteAll(): void - Elimina todos los objetos presentes en el archivo.

>> Aspectos a incluir en el entregable: 
El método save incorporará al producto un id numérico, que deberá ser siempre uno más que el id del último objeto agregado (o id 1 si es el primer objeto que se agrega) y no puede estar repetido.
Tomar en consideración el contenido previo del archivo, en caso de utilizar uno existente.
Implementar el manejo de archivos con el módulo fs de node.js, utilizando promesas con async/await y manejo de errores.
Probar el módulo creando un contenedor de productos, que se guarde en el archivo: “productos.txt”
Incluir un llamado de prueba a cada método, y mostrando por pantalla según corresponda para verificar el correcto funcionamiento del módulo construído. 
El formato de cada producto sserá:  
    title: (nombre del producto),
    price: (precio),
    thumbnail: (url de la foto del producto)

    (tenes que crear la clase y dentro los metodos utilizando el modulo fs)

    >> Ejemplo:
Contenido de "productos.txt" con 3 productos almacenados:
[                                                                                                                                                     
    {                                                                                                                                                    
      title: 'Escuadra',                                                                                                                                 
      price: 123.45,                                                                                                                                     
      thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png',                                     
      id: 1                                                                                                                                              
    },                                                                                                                                                   
    {                                                                                                                                                    
      title: 'Calculadora',                                                                                                                              
      price: 234.56,                                                                                                                                     
      thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png',                                          
      id: 2                                                                                                                                              
    },                                                                                                                                                   
    {                                                                                                                                                    
      title: 'Globo Terráqueo',                                                                                                                          
      price: 345.67,                                                                                                                                     
      thumbnail: 'https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png',                                   
      id: 3                                                                                                                                              
    }                                                                                                                                                    
  ] 

*/
/*
const productos = [                               
                    {                                                                                                                                                    
                    title: 'Cavancha',                                                                                                                                 
                    price: 55000,                                                                                                                                     
                    thumbnail: 'https://i.ibb.co/9v9TrJ0/naranjo.jpg',                                     
                    id: 672643                                                                                                                                            
                    },                                                                                                                                                   
                    {                                                                                                                                                    
                    title: 'Bombín',                                                                                                                              
                    price: 45000,                                                                                                                                     
                    thumbnail: 'https://i.ibb.co/9NsMW2N/negro.jpg',                                          
                    id: 252250                                                                                                                                             
                    },                                                                                                                                                   
                    {                                                                                                                                                    
                    title: 'Aroma',                                                                                                                          
                    price: 50000,                                                                                                                                     
                    thumbnail: 'https://i.ibb.co/DGr0LVV/amarillo.jpg',                                   
                    id: 935569                                                                                                                                              
                    }                                                                                                                                                    
                ]
*/
// id es color de mochila en inglés transformado a número de teclado telefónico. Si faltan letras se agrega 0

const fs = require('fs');
let products = [];

/*
fs.writeFile('./AguilaPablo/productos.txt', 'texto de prueba\n', error => {
        if (error){
        } else {
            console.log('archivo guardado')
        }
    });
*/
class Contenedor {
    constructor (file) {
        this.file = file;
    }


    
    //save(Object): Number - Recibe un objeto, lo guarda en el archivo, devuelve el id asignado.
  async save(product) {
        try {
            const content = await fs.promises.readFile(this.file, 'utf-8')
            products = JSON.parse(content)
        }
        catch (err) {
            console.log('Error al guardar producto', err)
        }
        product.id = this.maxId(products) + 1;
        products.push(product);
        console.log('Producto agregado: ' + JSON.stringify(product));        
    
        try {
            await this.addProducts(products);
        } 
        catch(err) {
            console.log('Error: archivo no guardado');
        }
    }

    maxId(products) {
        let id = 0;
        products.map(prod => {
            if(prod.id > id) {
                id = prod.id
            }
        })
        return id;
    }
    
    async  addProducts(products) {
        try {
            await fs.promises.writeFile(this.file, JSON.stringify(products));
            console.log('Producto guardado');
        }
        catch(err) {
            console.log('Error: archivo no guardado')
        }
    }


    //getById(Number): Object - Recibe un id y devuelve el objeto con ese id, o null si no está.
    async getById(number) {
        try {
            const products = await this.getAll();
            if(products != null) {
                const prod = products.find(prod => prod.id == number);
                return prod;
            } else {
                console.log('No hay productos agregados');
                return null;
            }
        }
        catch (err) {
            console.log('Error al obtener producto seleccionado', err)
        }        
    }

    //getAll(): Object[] - Devuelve un array con los objetos presentes en el archivo
    async getAll() {
        try {
            const content = await fs.promises.readFile(this.file, 'utf-8');
            const products = JSON.parse(content);
            return products;
        }
        catch (err) {
            console.log('Error al obtener productos', err);
            return null;
        }        
    }

    //deleteById(Number): void - Elimina del archivo el objeto con el id buscado.
    async deleteById(Number) {
        try {
            products = await fs.readFile(this.filePath, 'utf-8', (error, content) => {
                if(error) {
                    console.log('No hay productos para borrar')
                } else {
                    products = JSON.parse(content);
                    const  prod = products.find(prod => prod.id == Number);
                    if(prod.length == 0) {
                        console.log(`No está el producto ${Number}`);
                    } else {
                        let i = products.indexOf(prod);
                        console.log(`índice ${i}`);
                        products.splice(i, 1);
                        this.addProducts(products);
                        console.log(`producto ${Number}`);
                    }                  
                }
            });
        }
        catch (err) {
            console.log('Error al eliminar producto seleccionado', err)
        }        
    }

    //deleteAll(): void - Elimina todos los objetos presentes en el archivo.
    async deleteAll() {
        try { 
            await fs.unlink(this.file, error => {
                if(error) {
                    console.log('Error al eliminar producto')
                } else {
                    console.log('Productos eliminados')
                }
            })
        }
        catch (err) {
            console.log('Error al eliminar todos los produtos', err)
        }        
    }
};



const programa = async() => {
    const  mochilas = new Contenedor('AguilaPablo/productos.json');

    const mochila1 = {
        title: 'Cavancha',
        price: 55000, 
        thumbnail: 'https://i.ibb.co/9v9TrJ0/naranjo.jpg'
    }
    await mochilas.save(mochila1);

    const mochila2 = {
        title: 'Bombín',
        price: 45000, 
        thumbnail: 'https://i.ibb.co/9NsMW2N/negro.jpg'
    }
    await mochilas.save(mochila2);

    const mochila3 = {
        title: 'Aroma',
        price: 50000, 
        thumbnail: 'https://i.ibb.co/DGr0LVV/amarillo.jpg'
    }
    await mochilas.save(mochila3);

    await console.log(mochilas.getAll());
    //const prods = await mochilas.getAll();
    //console.log('array de productos: ' + JSON.stringify(prods));
  
    await console.log(mochilas.getById(3));
    //const prod = await mochilas.getById(3);
    //console.log('producto filtrado: ' + JSON.stringify(prod));

    await mochilas.deleteById(9);
    await console.log(mochilas.getAll());

}

programa();




// node AguilaPablo\AguilaPablo.js

/*
const contenedor1 = new Contenedor(1, 'Cavancha', 55000, 'https://i.ibb.co/9v9TrJ0/naranjo.jpg');
console.log(contenedor1);
contenedor1.save();
*/

/*
const usuario1 = new Usuario('Pablo', 'Aguila', [], []);

console.log(usuario1);

usuario1.addMascota('perro');
usuario1.addMascota('gato');
usuario1.addMascota('pez');

usuario1.countMascotas();

usuario1.addBook('Salambó', 'Gustave Flaubert');
usuario1.addBook('La divina comedia', 'Dante');

usuario1.getBookNames();

console.log(usuario1.countMascotas());
console.log(usuario1.getBookNames());

const verUsuario = () => {
    return console.log(`El usuario ${usuario1.getFullName()} tiene ${usuario1.countMascotas()} tipos de mascotas y tiene los siguientes libros: ${usuario1.getBookNames()} `)
}

console.log(verUsuario())
console.log(usuario1.libros)
console.log(usuario1.mascotas)
console.log(usuario1.getFullName())
*/

