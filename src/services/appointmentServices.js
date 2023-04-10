import errors from "../errors/index.js";
import appointmentsRepository from "../repositories/appointmentsRepository.js";
import doctorRepository from "../repositories/doctorRepository.js";
import patientRepository from "../repositories/patientRepository.js";

async function getFreeAppointments(){
    const {rows} = await appointmentsRepository.getFreeAppointments();
    return rows
}

async function create(user, date, time){
    if(user.type !== 'doctor') throw errors.invalidTypeOfUserError()

    const {rowCount, rows: [doctor]} = await doctorRepository.findByUserId(user.id)

    if(!rowCount) throw errors.notFoundError()

    const appointmentExist = await appointmentsRepository.getAppointment(date, time, doctor.id)

    if(appointmentExist.rowCount) throw errors.conflictError('Appointment already exists');

    await appointmentsRepository.create(date, time, doctor.id)
}

async function schedule(user){
    const {rows:[patient]} = await patientRepository.findByUserId(user.id)

    console.log(patient)

    return 
}

export default {getFreeAppointments, create, schedule}