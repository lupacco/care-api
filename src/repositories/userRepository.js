import connectionDb from "../config/database.js";

async function findByEmail(email){
    return await connectionDb.query(
        `SELECT * FROM users WHERE email = $1;`,[email]
    )
}

async function create({type, name, email, password}){
    return await connectionDb.query(
        `
        INSERT INTO users (type, name, email, password) VALUES ($1, $2, $3, $4)
        RETURNING id
        `,
        [type, name, email, password]
    )
}

export default {findByEmail, create}