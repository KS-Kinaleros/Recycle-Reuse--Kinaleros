'use strict'

const Product = require('./product.model')
const User = require('../user/user.model')

exports.test = async (req, res) => {
    res.status(200).send({ message: 'Test is running Product' })
}

//guardar producto
exports.saveProduct = async (req, res) => {
    try {
        //obtener token
        let token = req.user.sub
        //validar que la persona sea admin
        let userExist = await User.findOne({ _id: token })
        if (userExist.role !== 'ADMIN') return res.status(403).send({ message: 'No tienes permisos para crear productos' })
        //obtener data
        let data = req.body
        //validar que no exista duplicado
        let existProduct = await Product.findOne({ name: data.name })
        if (existProduct) return res.status(409).send({ message: 'El producto ya existe' })
        //guardar
        let product = new Product(data)
        await product.save()
        return res.status(200).send({ message: 'Producto guardado' })
    } catch (err) {
        console.log(err)
    }
}

//editar producto
exports.updateProduct = async (req, res) => {
    try {
        //token
        let token = req.user.sub
        //validar que la persona sea admin
        let userExist = await User.findOne({ _id: token })
        if (userExist.role !== 'ADMIN') return res.status(403).send({ message: 'No tienes permisos para editar productos' })
        //obtener el id del producto
        let productId = req.params.id
        //validar que exista el producto
        let existProduct = await Product.findOne({ _id: productId })
        if (!existProduct) return res.status(404).send({ message: 'El producto no existe' })
        //obtener data
        let data = req.body
        //actualizar
        let productUpdate = await Product.findOneAndUpdate(
            { _id: productId },
            data,
            { new: true }
        )
        if (!productUpdate) return res.status(404).send({ message: 'Producto no actualizado' })
        return res.status(200).send({ message: 'Producto actualizado correctamente', productUpdate })
    } catch (err) {
        console.log(err)
    }
}

//eliminar producto
exports.deleteProduct = async (req, res) => {
    try {
        //obtener token
        let token = req.user.sub
        //validar que la persona sea admin
        let userExist = await User.findOne({ _id: token })
        if (userExist.role !== 'ADMIN') return res.status(403).send({ message: 'No tienes permisos para eliminar productos' })
        //obtener el id del producto
        let productId = req.params.id
        //validar que exista el producto
        let existProduct = await Product.findOne({ _id: productId })
        if (!existProduct) return res.status(404).send({ message: 'El producto no existe' })
        //eliminar
        let deleteProduct = await Product.findOneAndDelete({ _id: productId })
        if (!deleteProduct) return res.status(404).send({ message: 'Producto no eliminado' })
        return res.status(200).send({ message: 'Producto eliminado correctamente' })
    } catch (err) {
        console.log(err)
    }
}

//listar productos
exports.getProducts = async (req, res) => {
    try {
        let products = await Product.find()
        if (!products) return res.status(404).send({ message: 'No hay productos' })
        return res.status(200).send({ products })
    } catch (err) {
        console.log(err)
    }
}

//listar productos por id
exports.getProductById = async (req, res) => {
    try {
        let productId = req.params.id
        let existProduct = await Product.findOne({ _id: productId })
        if (!existProduct) return res.status(404).send({ message: 'El producto no existe' })
        return res.status(200).send({ existProduct })
    } catch (err) {
        console.error(err)
    }
}
