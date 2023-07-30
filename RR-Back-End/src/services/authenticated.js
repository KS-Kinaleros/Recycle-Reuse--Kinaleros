'use strict'

//archivo para verificar si el token es valido (expirado, valido)
const jwt = require('jsonwebtoken');

//funcion middleware(Barrera logica)
exports.ensureAuth = (req, res, next)=>{
 if(!req.headers.authorization){
    return res.status(403).send({messege: `Doestn contain header "AUTHORIZATION `})
 }else{
    try{
    //obtener token
    let token = req.headers.authorization.replace(/['"]+/g, '');
    //Decodificar el token
    var payload = jwt.decode(token, `${process.env.SECRET_KEY}`);
    //validar que no haya expirado      
    if(Math.floor(Date.now()/1000) >= payload.exp){
        return res.status(401).send({message: 'Experid token'})
    }
    }catch(err) {
        console.error(err)
        return res.status(400).send({message: 'Invalid token'})
    }
    //inyectar a la solicitud un dato
    req.user = payload;
    next();
 }
}

exports.isAdmin = async(req, res, next)=>{
    try {
        let user = req.user;
        if(user.role !== 'ADMIN' || user.role !== 'WORKER') return res.status(403).send({message: 'Unauthorize user'})
        next();
    } catch (err) {
        console.error(err)
        return res.status(403).send({message: 'Error Unauthorize user'})
    }
}