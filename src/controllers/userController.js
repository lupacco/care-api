import userServices from "../services/userServices.js"

async function create(req, res, next){
    const {type, name, email, password} = req.body

    try {
        const result = await userServices.create(type, name, email, password)
        const createdUserId = result.rows[0].id
        
        console.log(createdUserId)
        return res.send()
        next()
    } catch (err) {
        next(err)
    }
}

export default {create}