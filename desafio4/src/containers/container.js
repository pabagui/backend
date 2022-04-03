//import fs from 'fs'
const fs = require('fs') 

class Container {
    constructor(file){
        this.id = 0
        this.file = file;
    }
    async save(data){
        data.id = this.id
        await fs.promises.readFile(this.file,'utf-8')
        .then(archive => JSON.parse(archive))// si lee el archivo lo parsea
        .then(archive => {
            if (archive.length != 0){
                data.id = archive[archive.length - 1].id + 1;
                this.id = data.id;
            }
            archive.push(data);
            return archive;
        })// si hay un array de objetos agrega el nuevo objeto
        .then(archive => {
            fs.promises.writeFile(this.file, JSON.stringify(archive)).catch(error =>console.log(error))
        })// y vuelve a escribir el archivo
        .catch(error => {
            console.log(error);
            fs.promises.writeFile(this.file, JSON.stringify([data])).catch(err => console.log(err));
            console.log('se creó el archivo')
            this.id = null;        
        })
        return this.id;
    }

    async getById(number){
        return await fs.promises.readFile(this.file,'utf-8')
        .then(archive => JSON.parse(archive))// si lee el archivo lo parsea
        .then(archive => archive.filter(obj => obj.id == number)[0])
        .catch(error => console.log(error))
    }
    async getAll(){
        return await fs.promises.readFile(this.file,'utf-8')
        .then(archive => JSON.parse(archive))// si lee el archivo lo parsea
        .catch(error => console.log(error))
    }
    async editById(id, changedElement){
        return await fs.promises.readFile(this.file,'utf-8')
        .then(archive => JSON.parse(archive))
        .then(archive => {
            archive = archive.map(element => {
                if (element.id == id){
                    element = changedElement
                    element.id = id
                }
                return element
            })
            return archive
        })
        .then(async archive => await fs.promises.writeFile(this.file, JSON.stringify(archive)).catch(error =>console.log(error)))
        .catch(err => console.log(err))
        
    }
    async deleteById(number){
        await fs.promises.readFile(this.file,'utf-8')
        .then(archive => JSON.parse(archive))// si lee el archivo lo parsea
        .then(archive => arch.filter(obj => obj.id != number))
        .then(async archive => {
            await fs.promises.writeFile(this.file, JSON.stringify(archive)).catch(error =>console.log(error))
        })
        .catch(error => console.log(error))
    }
    async deleteAll(number){
        await fs.promises.writeFile(this.file, JSON.stringify([])).catch(error =>console.log(error))
    }
}

exports.Container = Container