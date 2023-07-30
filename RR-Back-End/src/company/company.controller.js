'use strict'

const Company = require('./company.model')
const User = require('../user/user.model')
const { validateData } = require('../utils/validate')

exports.test = async (req, res) => {
    res.status(202).send({ message: 'Test is running Company' })
}

//agregar empresa
exports.saveCompany = async (req, res) => {
    try {
        //obtener token
        let token = req.user.sub
        //validar que el usuario sea admin
        let userExist = await User.findOne({ _id: token })
        if (userExist.role !== 'ADMIN') return res.status(400).send({ message: 'No tienes permisos para guardar una empresa' })
        //obtener data
        let data = req.body
        //guardar empresa
        let company = new Company(data)
        await company.save()
        return res.send({ message: 'Empresa creada exitosamente' })
    } catch (err) {
        console.error(err)
    }
}

//editar empresa
exports.updateCompany = async (req, res) => {
    try {
        //obtener token
        let token = req.user.sub
        //validar que el usuario sea admin
        let userExist = await User.findOne({ _id: token })
        if (userExist.role !== 'ADMIN') return res.status(400).send({ message: 'No tienes permisos para editar una empresa' })
        //obterner id de la empresa
        let companyId = req.params.id
        //validar que exista la empresa
        let existCompany = await Company.findOne({ _id: companyId })
        if (!existCompany) return res.status(404).send({ message: 'La empresa no existe' })
        //obtener data
        let data = req.body
        //actualizar empresa
        let companyUpdate = await Company.findOneAndUpdate(
            { _id: companyId },
            data,
            { new: true }
        )
        if (!companyUpdate) return res.status(404).send({ message: 'Empresa no actualizada' })
        return res.send({ message: 'Empresa actualizada correctamente', companyUpdate })
    } catch (err) {
        console.error(err)
    }
}

//eliminar empresa
exports.deleteCompany = async (req, res) => {
    try {
        //obtener token
        let token = req.user.sub
        //validar que el usuario sea admin
        let userExist = await User.findOne({ _id: token })
        if (userExist.role !== 'ADMIN') return res.status(400).send({ message: 'No tienes permisos para eliminar una empresa' })
        //obtener id de la empresa
        let companyId = req.params.id
        //validar que exista la empresa
        let existCompany = await Company.findOne({ _id: companyId })
        if (!existCompany) return res.status(404).send({ message: 'La empresa no existe' })
        //eliminar empresa
        let companyDelete = await Company.findOneAndDelete({ _id: companyId })
        if (!companyDelete) return res.status(404).send({ message: 'Empresa no eliminada' })
        return res.send({ message: 'Empresa eliminada correctamente', companyDelete })
    } catch (err) {
        console.error(err)
    }
}

//buscar empresa por nombre
exports.searchCompany = async (req, res) => {
    try {
        let params = {
            name: req.params.name
        }
        let validate = validateData(params)
        if (validate) return res.status(400).send(validate)
        let companies = await Company.find({
            name: {
                $regex: params.name,
                $options: 'i'
            }
        })
        return res.send({ companies })
    } catch (err) {
        console.error(err)
    }
}

//obtener empresas
exports.getCompanies = async (req, res) => {
    try {
        let companies = await Company.find()
        if (!companies) return res.status(404).send({ message: 'No hay empresas' })
        return res.send({ companies })
    } catch (err) {
        console.error(err)
    }
}

//obtener empresa por id
exports.getCompanyId = async (req, res) => {
    try {
        //obtener id de la empresa
        let companyId = req.params.id
        //validar que exista la empresa
        let existCompany = await Company.findOne({ _id: companyId })
        if (!existCompany) return res.status(404).send({ message: 'La empresa no existe' })
        return res.send({ existCompany })
    } catch (err) {
        console.error(err)
    }
}