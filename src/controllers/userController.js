import userServices from "../services/userServices.js"

async function create(req, res, next){
    const {type, name, email, password} = req.body

    try {
        const result = await userServices.create(type, name, email, password)
        const createdUserId = result.rows[0].id

        req.body.userId = createdUserId
        
        next()
    } catch (err) {
        next(err)
    }
}

export default {create}