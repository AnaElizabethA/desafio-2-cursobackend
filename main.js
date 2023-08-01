import { promises as fs } from 'fs'

class ProductManager {
    constructor() {
        this.path = './products.txt'
    }

    //agrega productos al txt
    addProduct = async (product) => {
        const products = JSON.parse(await fs.readFile(this.path, 'utf-8'))

        if (products.some(prod => prod.code === product.code)) {
            console.log(`There is already a product with the code: ${product.code}`)
            return
        }

        if (product.title === "" || product.description === "" || product.price === "" || product.thumbnail === "" || product.code === "" || product.stock < 0) {
            console.log("Some fields are empty, please complete all fields")
            return
        }

        else {
            products.push(product)
        }

        await fs.writeFile(this.path, JSON.stringify(products))
    }


    getProducts = async () => {
        const products = JSON.parse(await fs.readFile(this.path, 'utf-8'))
        console.log(products)
    }

    getProductById = async (id) => {
        const products = JSON.parse(await fs.readFile(this.path, 'utf-8'))
        const product = products.find(prod => prod.id === id)

        product ? console.log(product) : console.log(`Product with ID: ${id} does not exist`)
    }



    updateProduct = async (id, { title, description, price, thumbnail, code, stock }) => {
        const products = JSON.parse(await fs.readFile(this.path, 'utf-8'))
        const indice = products.findIndex(prod => prod.id === id)

        if (indice !== -1) {
            const product = products[indice]
            product.title = title ?? product.title
            product.description = description ?? product.description
            product.price = price ?? product.price
            product.thumbnail = thumbnail ?? product.thumbnail
            product.code = code ?? product.code
            product.stock = stock ?? product.stock

            await fs.writeFile(this.path, JSON.stringify(products))
        }

        else {
            console.log(`producto no encontrado ${id} not found`)
        }
    }

    // elimina producto
    deleteProduct = async (id) => {
        const products = JSON.parse(await fs.readFile(this.path, 'utf-8'))
        const prods = products.filter(prod => prod.id != id)

        await fs.writeFile(this.path, JSON.stringify(prods))
    }

}


class Product {
    constructor(title, description, price, thumbnail, code, stock) {
        this.title = title
        this.description = description
        this.price = price
        this.thumbnail = thumbnail
        this.code = code
        this.stock = stock
        this.id = Product.incrementarID()
    }

    static incrementarID() {
        if (this.idIncrement) {
            this.idIncrement++
        } else {
            this.idIncrement = 1
        }
        return this.idIncrement
    }
}


const product1 = new Product("Computadora", "Lenovo", 1000, "", "123", 20)
const product2 = new Product("Celular", "Samsung", 2000, "", "456", 10)

const productManager = new ProductManager()

//productManager.addProduct(product1)
//productManager.addProduct(product2)

//console.log(productManager.getProducts())
//console.log(productManager.getProductById(2))

productManager.getProducts()