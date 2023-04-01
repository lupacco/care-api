import bcrypt from "bcrypt"
import errors from "../errors/index.js"
import userRepository from "../repositories/userRepository.js"
import connectionDb from "../config/database.js"

async function create(type, name, email, password){
    const {rowCount} = await userRepository.findByEmail(email)

    if(rowCount) throw errors.duplicatedEmailError(email)

    const hashPassword = await bcrypt.hash(password, 10)

    return await userRepository.create({type, name, email, password: hashPassword})
}

export default {create}