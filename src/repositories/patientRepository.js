import connectionDb from "../config/database.js";

async function findByCpf(cpf){
    return await connectionDb.query(`
        SELECT * FROM patients WHERE cpf = $1
    `,
    [cpf])
}

async function create(cpf, userId){
    return await connectionDb.query(`
        INSERT INTO patients (cpf, "userId")
        VALUES ($1, $2)
    `,
    [cpf, userId])
}

export default {findByCpf, create}