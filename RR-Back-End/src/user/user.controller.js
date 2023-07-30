'use strict'

const User = require('./user.model')
const { validateData, encrypt, checkPassword, checkUpdate } = require('../utils/validate')
const { createToken } = require('../services/jwt')

//test
exports.test = (req, res) => {
    res.status(202).send({ message: 'Test is running User' })
}

//agregar admin por defecto
exports.saveAdminDef = async (req, res) => {
    try {
        let data = {
            name: "Admin",
            surname: 'Admin',
            username: "admin",
            phone: "12345678",
            email: "admin@gmail.com",
            password: "admin",
            role: "ADMIN"
        }
        data.password = await encrypt(data.password)
        let existUser = await User.findOne({ name: "Admin" })
        if (existUser) return console.log("Administrador por default ya ha sido creado")
        let defUser = new User(data)
        await defUser.save()
        return console.log("Administrador creado correctamente")
    } catch (err) {
        console.error(err)
    }
}

//agregar usuario
exports.saveUser = async (req, res) => {
    try {
        //obtener data
        let data = req.body

        let params = {
            password: data.password
        }
        let validate = validateData(params)
        if (validate) return res.status(400).send(validate)
        //encriptar password
        data.password = await encrypt(data.password)

        data.role = "CLIENT"

        let user = new User(data)
        await user.save()
        return res.send({ message: "Usuario creado exitosamente" })
    } catch (err) {
        console.error(err)
    }
}

//login
exports.login = async (req, res) => {
    try {
        let data = req.body;
        let credentials = {
            username: data.username,
            password: data.password
        }
        let msg = validateData(credentials)
        if (msg) return res.status(400).send(msg)
        //validar que si exista
        let user = await User.findOne({ username: data.username })
        //validar la contraseña
        if (user && await checkPassword(data.password, user.password)) {
            let userLogged = {
                name: user.name,
                username: user.username,
                role: user.role
            }
            let token = await createToken(user)
            return res.send({ message: "Inicio de sesión exitoso", token, userLogged })
        }
        return res.status(400).send({ message: "Credenciales invalidas" })
    } catch (err) {
        console.error(err)
    }
}

//editar usuario - administrador
exports.updateUser = async (req, res) => {
    try {

    } catch (err) {
        console.error(err)
    }
}

//editar usuario - cuenta propia
exports.updateUser = async (req, res) => {
    try {
        let token = req.user.sub
        //obtener data
        let data = req.body

        //actualizar datos
        let userUpdate = await User.findOneAndUpdate(
            { _id: tokem },
            data,
            { new: true }
        )
        if (!userUpdate) return res.status(404).send({ message: 'Datos no actualizados' })
        return res.send({ message: 'Datos actualizados correctamente', userUpdate })

    } catch (err) {
        console.error(err)
    }
}

//eliminar usuario - admin
exports.deleteUser = async (req, res) => {
    try {
        //obtener el token del admin
        let token = req.user.sub
        //verificar que el usuario del token seas admin
        let adminToken = await User.findOne({ _id: token })
        if (adminToken.role !== 'ADMIN') return res.status(403).send({ message: 'No tienes permisos para realizar esta acción' })

        //obtener el id del usuario a eliminar
        let userId = req.params.id

        //eliminar
        let deleteUser = await User.findOneAndDelete({ _id: userId })
        if (!deleteUser) return res.status(404).send({ message: 'Usuario no eliminado' })
        return res.send({ message: 'Usuario eliminado correctamente', deleteUser })
    } catch (err) {
        console.error(err)
    }
}

//eliminar usuario - cuenta propia
exports.deleteUser = async (req, res) => {
    try {
        let token = req.user.sub
        //verificar que existe el usuario
        let userExist = await User.findOne({ _id: token })
        if (!userExist) return res.status(404).send({ message: 'Usuario no encontrado' })
        //eliminar
        let deleteUser = await User.findOneAndDelete({ _id: token })
        if (!deleteUser) return res.status(404).send({ message: 'Cuenta no eliminada' })
        return res.send({ message: 'Cuenta eliminada correctamente', deleteUser })
    } catch (err) {
        console.error(err)
    }
}

//obtener todos los usuarios
exports.getUsers = async (req, res) => {
    try {
        //verificar que sea admin
        let token = req.user.sub
        //verificar que el usuario del token seas admin
        let userToken = await User.findOne({ _id: token })
        if (userToken.role !== 'ADMIN') return res.status(403).send({ message: 'No tienes permisos para realizar esta acción' })

        //obtener usuarios
        let users = await User.find()
        if (!users) return res.status(404).send({ message: 'No hay usuarios registrados' })
        return res.send({ message: 'Usuarios encontrados', users })
    } catch (err) {
        console.error(err)
    }
}

//obtener el usuario de la cuenta
exports.getUserId = async (req, res) => {
    try {
        //obtener token
        let Token = req.user.sub

        //obtener le usuario
        let user = await User.findOne({ _id: Token })
        if (!user) return res.status(404).send({ message: 'Usuario no encontrado' })
        return res.send({ message: 'Usuario encontrado', user })
    } catch (err) {
        console.error(err)
    }
}