import appointmentServices from "../services/appointmentServices.js"

async function create(req, res, next){
    const {date, time} = req.body
    const {user} = res.locals
    try {
        const result = await appointmentServices.create(user, date, time)
        
        return res.sendStatus(201)
    } catch (err) {
        next(err)
    }
}

async function getFreeAppointments(req, res, next){
    try {
        const result = await appointmentServices.getFreeAppointments()
        res.send(result)
    } catch (err) {
        next(err)
    }
}

async function schedule(req, res, next){
    const {user} = res.locals
    try {
        await appointmentServices.schedule(user)
        return res.senStatus(200)
    } catch (err) {
        next(err)
    }
}

export default {create, getFreeAppointments, schedule}