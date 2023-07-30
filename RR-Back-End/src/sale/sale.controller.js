'use strict'

const Sale = require('./sale.model')
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
        data.date = moment().format('DD/MM/YYYY:HH:mm:ss')

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

//cancelar venta
exports.cancelSale = async (req, res) => {
    try {
        //obtener token
        let token = req.user.sub
        //obtener id de la venta
        let saleId = req.params.id
        //validar de que exista la venta y sea del usuario
        let saleExist = await Sale.findOne({ _id: saleId, user: token })
        if (!saleExist) return res.status(404).send({ message: 'La venta no existe' })

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
        let sale = await Sale.find()
        if (!sale) return res.status(404).send({ message: 'No hay ventas' })
        return res.status(200).send({ sale })
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
        let sales = await Sale.find({ user: token })
        if (!sales) return res.status(404).send({ message: 'No hay ventas' })
        return res.status(200).send({ sales })
    } catch (err) {
        console.error(err)
    }
}