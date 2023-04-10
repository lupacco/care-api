import errors from "../errors/index.js";
import appointmentsRepository from "../repositories/appointmentsRepository.js";
import doctorRepository from "../repositories/doctorRepository.js";

async function getAllAppointments(){
    const {rows} = await appointmentsRepository.getAllAppointments();
    return rows
}

async function create(user, date, time){
    if(user.type !== 'doctor') throw errors.invalidTypeOfUserError()

    const {rowCount, rows: [doctor]} = await doctorRepository.findByUserId(user.id)

    if(!rowCount) throw errors.notFoundError()

    await appointmentsRepository.create(date, time, doctor.id)
}

export default {getAllAppointments, create}