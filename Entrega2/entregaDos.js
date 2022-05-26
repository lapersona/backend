const fs = require('fs')

//Creacion de la clase

class File{
    constructor(name){
        this.name= name;
        this.products = [];
    }

    // Lectura de archivo

    async read(){
        try{
            let content = await fs.promises.readFile(this.name, 'utf-8')
            if(content) return console.log(content)
        }catch(err){
            console.error([])
        }
    }

    // Obtener ID

    getId(){
        const length = this.products.length
        if(length < 1) return 0
        return this.products[this.products.length - 1].id
    }
    
    // Guarda un producto en el archivo

    async save(product){
        const id = this.getId()
        this.products.push({
            ...product, ...{id: id + 1}
        })
        try{
          await  fs.promises.writeFile(this.name, JSON.stringify(this.products, null, '\t'))
        }catch(err){
            console.error("Can`t save! " + err)
        }
    }

    // Buscar producto por id

    getById(id){
        return this.products.find(p => p.id == id)
    }

    // Mostrar productos

    getAll(){
        return this.products
    }

    // Borrar por id

    deleteById(id){
        const idx = this.products.findIndex(p => p.id == id)
        this.products.splice(idx, 1)
      
    }

    // Borrar todos

    async erase(){
        this.products = []
        await fs.promises.readFile(this.name, 'utf-8')
    }
}

// Creacion de Archivo

const file = new File("./file/products.txt")

// Carga de datos en el archivo

file.save({title: "Iphone", price: 8999.50, id: 1})
file.save({title: "Imac", price: 91500.50, id: 2})
file.save({title: "Macbook", price: 90000.50, id: 3})
file.save({title: "Ipad", price: 29000.50, id: 4})

file.read()

file.deleteById(1)