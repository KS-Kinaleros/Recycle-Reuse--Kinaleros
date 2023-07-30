'use strict'

const bcrypt = require('bcrypt');

//validacion, encriptacion, comparaciones de encriptacion

exports.validateData = (data)=>{
    let keys = Object.keys(data), msg = '';
    for(let key of keys){
        if( data[key] !==null && 
            data[key] !==undefined &&
            data[key] !== '') continue;
            msg += `Params ${key} is required\n`;
    }
    return msg.trim();
}

exports.encrypt = async(password)=>{
    try {
        return await bcrypt.hash(password, 10);

    }catch(err) {
        console.error(err);
        return err;
    }
}

exports.checkPassword = async(password, hash)=>{
    try {
        return await bcrypt.compare(password, hash)
    } catch (err) {
        console.error(err);
        return false;
    }
}

exports.checkUpdate = (data)=>{
    if( Object.entries(data).length === 0 ||
    data.user ||
    data.user == ''
    ){
        return false;
    }
    return false
}