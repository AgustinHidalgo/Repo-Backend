import {dirname} from 'path'
import { fileURLToPath } from 'url'
import bcrypt from 'bcrypt'
import jwt  from 'jsonwebtoken'
import config from './config.js'


export const __dirname = dirname(fileURLToPath(import.meta.url))

export const hashPassword = async(password) =>{
    return bcrypt.hash(password,10)
};

export const comparePasswords = async(password, passwordDB)=>{
    return await bcrypt.compare(password,passwordDB)
};

export const generateToken = (user) => {
    return jwt.sign({user}, config.SECRET_KEY_TOKEN, {expiresIn: '1h'})
}

export const verifyToken = async (token) => {
    try {
        return jwt.verify(token, config.SECRET_KEY_TOKEN)
    } catch (error) {
        return null
    }
}