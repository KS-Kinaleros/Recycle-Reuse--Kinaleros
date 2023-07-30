'use strict'

const Forum = require('./forum.model')
const User = require('../user/user.model')
const moment = require('moment')

exports.test = (req, res) => {
    res.status(202).send({ message: 'Test is running Forum' })
}

//agregar foro
exports.saveForum = async (req, res) => {
    try {
        //obtener token de la persona que esta creando el foro
        let token = req.user.sub
        //validar que exista esta persona
        let userExist = await User.findOne({ _id: token })
        if (!userExist) return res.status(404).send({ message: 'El usuario no existe' })

        //obtener data
        let data = req.body
        data.date = moment().format('DD/MM/YYYY')
        data.user = token

        //guardar el foro
        let forum = new Forum(data)
        await forum.save()
        return res.send({ message: 'Foro creado exitosamente' })
    } catch (err) {
        console.error(err)
    }
}

//editar foro
exports.updateForum = async (req, res) => {
    try {
        //obtener token de la persona
        let token = req.user.sub
        //validar que exista la persona
        let userExist = User.findOne({ _id: token })
        if (!userExist) return res.status(404).send({ message: 'El usuario no existe' })
        //obtener el id del foro
        let forumId = req.params.id
        //validar que exista el foro
        let existForum = await Forum.findOne({ _id: forumId })
        if (!existForum) return res.status(404).send({ message: 'El foro no existe' })
        //validar que el creador del foro sea el mismo que lo esta editando
        if (existForum.user !== token) return res.status(400).send({ message: 'No tienes permisos para editar este foro' })

        //obtener data
        let data = req.body

        //actualizar el foro
        let forumUpdate = await Forum.findOneAndUpdate(
            { _id: forumId },
            data,
            { new: true }
        )
        if (!forumUpdate) return res.status(404).send({ message: 'Foro no actualizado' })
        return res.send({ message: 'Foro actualizado correctamente', forumUpdate })
    } catch (err) {
        console.error(err)
    }
}

//eliminar foro
exports.deleteForum = async (req, res) => {
    try {
        //obtener token de la persona
        let token = req.user.sub
        //validar que exista la persona
        let userExist = User.findOne({ _id: token })
        if (!userExist) return res.status(404).send({ message: 'El usuario no existe' })
        //obtener el id del foro
        let forumId = req.params.id
        //validar que exista el foro
        let existForum = await Forum.findOne({ _id: forumId })
        if (!existForum) return res.status(404).send({ message: 'El foro no existe' })
        //validar que el creador del foro sea el mismo que lo esta eliminando
        if (existForum.user !== token) return res.status(400).send({ message: 'No tienes permisos para eliminar este foro' })

        //eliminar el foro
        let deleteForum = await Forum.findOneAndDelete({ _id: forumId })
        if (!deleteForum) return res.status(404).send({ message: 'Foro no eliminado' })
        return res.send({ message: 'Foro eliminado correctamente', deleteForum })
    } catch (err) {
        console.error(err)
    }
}

//agregar respuesta
exports.saveAnswer = async (req, res) => {
    try {
        //obtener el id del foro
        let forumId = req.params.id
        //obtener el token de la persona que esta respondiendo
        let token = req.user.sub
        //obtener data
        let data = req.body

        //validar que exista el foro
        let existForum = await User.findOne({ _id: forumId })
        if (!existForum) return res.status(404).send({ message: 'El foro no existe' })

        //guadar la respuesta
        const updatedForum = await Forum.findOneAndUpdate(
            { _id: forumId },
            {
                $push: {
                    answers: {
                        user: userId,
                        date: date,
                        answer: answer,
                    },
                },
            },
            { new: true }
        );
        if (!updatedForum) return res.status(404).send({ message: 'Respuesta no agregada' })
        res.status(200).send({ message: 'Respuesta agregada correctamente' })
    } catch (err) {
        console.error(err)
    }
}

//obtener foros
exports.getForums = async (req, res) => {
    try {
        let forums = await Forum.find()
        if (!forums) return res.status(404).send({ message: 'No hay foros' })
        return res.send({ forums })
    } catch (err) {
        console.error(err)
    }
}

//obtener foro por id
exports.getForumId = async (req, res) => {
    try {
        //obtener id del foro
        let forumId = req.params.id
        //validar que exista el foro
        let existForum = await Forum.findOne({ _id: forumId })
        if (!existForum) return res.status(404).send({ message: 'El foro no existe' })
        return res.send({ existForum })
    } catch (err) {
        console.error(err)
    }
}