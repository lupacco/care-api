import doctorServices from "../services/doctorServices.js"

async function create(req, res, next){
    const {type, crm, speciality} = req.body
    try {
        console.log(req.body)
        return res.sendStatus(201)
    } catch (err) {
        next(err)
    }
}

export default {create}