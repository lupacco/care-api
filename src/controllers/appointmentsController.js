import { request } from "express"
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

async function getAllAppointments(req, res, next){
    try {
        const result = await appointmentServices.getAllAppointments()
        res.send(result)
    } catch (err) {
        next(err)
    }
}

export default {create, getAllAppointments}