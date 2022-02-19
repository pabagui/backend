/*
>> Consigna: 
1) Declarar una clase Usuario

2) Hacer que Usuario cuente con los siguientes atributos:
nombre: String
apellido: String
libros: Object[]
mascotas: String[]

Los valores de los atributos se deberán cargar a través del constructor, al momento de crear las instancias.
3) Hacer que Usuario cuente con los siguientes métodos:
getFullName(): String. Retorna el completo del usuario. Utilizar template strings.
addMascota(String): void. Recibe un nombre de mascota y lo agrega al array de mascotas.
countMascotas(): Number. Retorna la cantidad de mascotas que tiene el usuario.
addBook(String, String): void. Recibe un string 'nombre' y un string 'autor' y debe agregar un objeto: { nombre: String, autor: String } al array de libros.
getBookNames(): String[]. Retorna un array con sólo los nombres del array de libros del usuario.
4) Crear un objeto llamado usuario con valores arbitrarios e invocar todos sus métodos.

>> Ejemplos:

countMascotas: Suponiendo que el usuario tiene estas mascotas: ['perro', 'gato'] usuario.countMascotas() debería devolver 2.

getBooks: Suponiendo que el usuario tiene estos libros: [{nombre: 'El señor de las moscas',autor: 'William Golding'}, {nombre: 'Fundacion', autor: 'Isaac Asimov'}] usuario.getBooks() debería devolver ['El señor de las moscas', 'Fundacion'].

getFullName: Suponiendo que el usuario tiene: nombre: 'Elon' y apellido: 'Musk' usuario.getFullName() deberia devolver 'Elon Musk'

*/

class Usuario {
    constructor (nombre, apellido, libros, mascotas) {
        this.nombre = nombre; //string
        this.apellido = apellido; //string
        this.libros = libros; //object[]
        this.mascotas = mascotas; //string[]
    }

    //getFullName(): String. Retorna el completo del usuario. Utilizar template strings.
    getFullName() {
        return `${this.nombre} ${this.apellido}`;
    }

    //addMascota(String): void. Recibe un nombre de mascota y lo agrega al array de mascotas.
    addMascota(tipoMascota) {
        this.mascotas.push(tipoMascota);
    }

    //countMascotas(): Number. Retorna la cantidad de mascotas que tiene el usuario.
    countMascotas() {
        return this.mascotas.length;
    }

    //addBook(String, String): void. Recibe un string 'nombre' y un string 'autor' y debe agregar un objeto: { nombre: String, autor: String } al array de libros.
    addBook(nombre, autor) {
        this.libros.push({nombre: nombre, autor: autor});
    }

    //getBookNames(): String[]. Retorna un array con sólo los nombres del array de libros del usuario.
    getBookNames() {
        return this.libros.map(libro => 
            libro.nombre);
    }
    
};


const usuario1 = new Usuario('Pablo', 'Aguila', [], []);

console.log(usuario1);
//console.log(usuario1.libros);

//usuario1.getFullName();
//usuario1.getFullName();

usuario1.addMascota('perro');
usuario1.addMascota('gato');
usuario1.addMascota('pez');

usuario1.countMascotas();

usuario1.addBook('Salambó', 'Gustave Flaubert');
usuario1.addBook('La divina comedia', 'Dante');

usuario1.getBookNames();



// node AguilaPablo\AguilaPablo.js

console.log(usuario1.countMascotas());
console.log(usuario1.getBookNames());

const verUsuario = () => {
    return console.log(`El usuario ${usuario1.getFullName()} tiene ${usuario1.countMascotas()} tipos de mascotas y tiene los siguientes libros: ${usuario1.getBookNames()} `)
}

console.log(verUsuario())
console.log(usuario1.libros)
console.log(usuario1.mascotas)
console.log(usuario1.getFullName())


