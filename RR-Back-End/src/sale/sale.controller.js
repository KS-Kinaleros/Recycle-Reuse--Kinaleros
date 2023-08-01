'use strict'

const Sale = require('./sale.model')
const Product = require('../product/product.model')
const User = require('../user/user.model')
const moment = require('moment')

exports.test = async (req, res) => {
    res.status(200).send({ message: 'Test is running Sales' })
}

//guardar venta
exports.saveSale = async (req, res) => {
    try {
        //obtener token
        let token = req.user.sub
        //obtener id de la compañia
        let companyId = req.params.id
        //obtener data
        let data = req.body
        data.date = moment().format('DD/MM/YYYY')
        data.user = token
        data.company = companyId

        //buscar el producto
        let productExist = await Product.findOne({ _id: data.product })
        if (!productExist) return res.status(404).send({ message: 'El producto no existe' })

        //hacer la multiplicacion del producto por la cantidad
        let total = productExist.price * data.quantity
        data.total = total

        await User.findOneAndUpdate({ _id: token }, {
            $inc: { money: Number(data.total) }
        }, { new: true })

        //guardar
        let sale = new Sale(data)
        await sale.save()
        return res.status(200).send({ message: 'Venta exitosa' })
    } catch (err) {
        console.error(err)
    }
}

//editar venta
exports.updateSale = async (req, res) => {
    try {
        //obtener token
        let token = req.user.sub
        //obtener id de la venta
        let saleId = req.params.id
        //validar de que exista la venta y sea del usuario
        let saleExist = await Sale.findOne({ _id: saleId, user: token })
        if (!saleExist) return res.status(404).send({ message: 'La venta no existe' })

        //obtener data
        let data = req.body
        //actualizar
        let saleUpdate = await Sale.findOneAndUpdate(
            { _id: saleId },
            data,
            { new: true }
        )
        if (!saleUpdate) return res.status(404).send({ message: 'Venta no actualizada' })
        return res.status(200).send({ message: 'Venta actualizada correctamente', saleUpdate })

    } catch (err) {
        console.error(err)
    }
}

//cancelar venta -- cuenta propia
exports.cancelSale = async (req, res) => {
    try {
        //obtener token
        let token = req.user.sub
        //obtener id de la venta
        let saleId = req.params.id
        //validar de que exista la venta y sea del usuario
        let saleExist = await Sale.findOne({ _id: saleId, user: token })
        if (!saleExist) return res.status(404).send({ message: 'La venta no existe' })

        //quitar el dinero
        await User.findOneAndUpdate({ _id: token }, {
            $inc: { money: Number(saleExist.total) * -1 }
        }, { new: true })


        //eliminar
        let saleDelete = await Sale.findOneAndDelete({ _id: saleId })
        if (!saleDelete) return res.status(404).send({ message: 'La venta no se pudo eliminar' })
        return res.status(200).send({ message: 'Venta eliminada correctamente' })
    } catch (err) {
        console.error(err)
    }
}

//cancelar venta -- administrador
exports.cancelSaleAdmin = async (req, res) => {
    try {
        //obtener token
        let token = req.user.sub
        //validar que sea admin
        let userExist = await User.findOne({ _id: token })
        if (userExist.role !== "ADMIN") return res.status(403).send({ message: 'No tienes permisos para realizar esta acción' })
        //obtener id de la venta
        let saleId = req.params.id
        //validar que exista la venta
        let saleExist = await Sale.findOne({ _id: saleId })

        //quitar el dinero
        await User.findOneAndUpdate({ _id: saleExist.user }, {
            $inc: { money: Number(saleExist.total) * -1 }
        }, { new: true })


        //eliminar
        let saleDelete = await Sale.findOneAndDelete({ _id: saleId })
        if (!saleDelete) return res.status(404).send({ message: 'La venta no se pudo eliminar' })
        return res.status(200).send({ message: 'Venta eliminada correctamente' })
    } catch (err) {
        console.error(err)
    }
}


//obtener ventas
exports.getSales = async (req, res) => {
    try {
        let sales = await Sale.find().populate('user', 'name').populate('company', 'name').populate('product', 'name')
        if (!sales) return res.status(404).send({ message: 'No hay ventas' })
        return res.status(200).send({ sales })
    } catch (err) {
        console.error(err)
    }
}

//obtener ventas por usuario
exports.getSaleByUser = async (req, res) => {
    try {
        //obtener token
        let token = req.user.sub
        //obtener ventas
        let sales = await Sale.find({ user: token }).populate('user', 'name').populate('company', 'name').populate('product', 'name')
        if (!sales) return res.status(404).send({ message: 'No hay ventas' })
        return res.status(200).send({ sales })
    } catch (err) {
        console.error(err)
        throw err
    }
}