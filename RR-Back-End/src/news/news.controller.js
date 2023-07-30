'use strict'

const News = require('./news.model')
const User = require('../user/user.model')
const moment = require('moment')

exports.test = (req, res) => {
    res.status(202).send({ message: 'Test is running News' })
}

//agregar noticias
exports.saveNews = async (req, res) => {
    try {
        //obtener data
        let data = req.body
        data.date = moment().format('DD/MM/YYYY')

        //obtener token
        let token = req.user.sub
        //solo admins van a poder crear noticias
        let userAdmin = await User.findOne({ _id: token })
        if (userAdmin.role !== 'ADMIN') return res.status(400).send({ message: 'No tienes permisos para crear noticias' })

        //guardar la noticia
        let news = new News(data)
        await news.save()
        return res.send({ message: "Noticia creada exitosamente" })
    } catch (err) {
        console.error(err)
    }
}

//editar noticias
exports.updateNews = async (req, res) => {
    try {
        //obtener data
        let data = req.body
        let newsId = req.params.id

        //obtener token
        let token = req.user.sub
        //solo admins van a poder crear noticias
        let userAdmin = await User.findOne({ _id: token })
        if (userAdmin.role !== 'ADMIN') return res.status(400).send({ message: 'No tienes permisos para editar noticias' })

        //validar que exista la noticia
        let existNews = await News.findOne({ _id: newsId })
        if (!existNews) return res.status(400).send({ message: 'La noticia no existe' })

        //actualizar la noticia
        let newsUpdate = await News.findOneAndUpdate(
            { _id: newsId },
            data,
            { new: true }
        )
        if (!newsUpdate) return res.status(404).send({ message: 'Noticia no actualizada' })
        return res.send({ message: 'Noticia actualizada correctamente', newsUpdate })
    } catch (err) {
        console.error(err)
    }
}

//eliminar noticias
exports.deleteNews = async (req, res) => {
    try {
        //obtener token
        let token = req.user.sub
        //solo admins van a poder eliminar noticias
        let userAdmin = await User.findOne({ _id: token })
        if (userAdmin.role !== 'ADMIN') return res.status(400).send({ message: 'No tienes permisos para eliminar noticias' })

        //obtener id
        let newsId = req.params.id
        //validar que exista la noticia
        let existNews = await News.findOne({ _id: newsId })
        //eliminar la noticia
        let deleteNew = await News.findOneAndDelete({_id: newsId})
        if (!deleteNew) return res.status(404).send({ message: 'Noticia no eliminada' })
        return res.send({ message: 'Noticia eliminada correctamente', deleteNew })
    } catch (err) {
        console.error(err)
    }
}

//obtener todas las noticias
exports.getNews = async (req, res) => {
    try {
        //obtner noticias
        let news = await News.find()
        if (!news) return res.status(404).send({ message: 'No hay noticias' })
        return res.send({ message: 'Noticias obtenidas correctamente', news })
    } catch (err) {
        console.error(err)
    }
}

//obtener una noticia por id
exports.getNewsId = async (req, res) => {
    try {
        let newsId = req.params.id
        //obtener noticia
        let news = await News.findOne({_id: newsId})
        if (!news) return res.status(404).send({ message: 'No existe la noticia' })
        return res.send({ message: 'Noticia obtenida correctamente', news })
    } catch (err) {
        console.error(err)
    }
}