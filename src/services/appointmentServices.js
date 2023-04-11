import errors from "../errors/index.js";
import appointmentRepository from "../repositories/appointmentRepository.js";
import doctorRepository from "../repositories/doctorRepository.js";
import patientRepository from "../repositories/patientRepository.js";

async function getFreeAppointments() {
  const { rows } = await appointmentRepository.getFreeAppointments();
  return rows;
}

async function create(user, date, time) {
  if (user.type !== "doctor") throw errors.invalidTypeOfUserError();

  const {
    rowCount,
    rows: [doctor],
  } = await doctorRepository.findByUserId(user.id);

  if (!rowCount) throw errors.notFoundError();

  const appointmentExist = await appointmentRepository.getAppointment(
    date,
    time,
    doctor.id
  );

  if (appointmentExist.rowCount)
    throw errors.conflictError("Appointment already exists");

  await appointmentRepository.create(date, time, doctor.id);
}

async function schedule(user, id) {
  if (user.type !== "patient") throw errors.invalidTypeOfUserError();
  const {
    rows: [patient],
  } = await patientRepository.findByUserId(user.id);

  const {
    rows: [appointment],
  } = await appointmentRepository.findById(id);

  if(!appointment) throw errors.notFoundError()

  if (appointment.status !== "free")
    throw errors.conflictError("This appointment is not available");

  await appointmentRepository.schedule(id, patient.id);
}

async function updateStatus(id, status, user) {
  if (user.type !== "doctor") throw errors.invalidTypeOfUserError();
  
  switch (status) {
    case "cancel":
      await appointmentRepository.cancel(id);
      break;
    case "confirm":
      await appointmentRepository.confirm(id);
      break;
    case "finish":
      await appointmentRepository.finish(id);
      break
    case "free":
      await appointmentRepository.free(id);
      break
    default:
      throw errors.notFoundError();
  }
}

async function getScheduledAppointments(user){
    switch (user.type) {
        case 'patient':
            console.log('entrou caso 1')
            const {
                rows: [patient],
              } = await patientRepository.findByUserId(user.id);
            return await appointmentRepository.getPatientScheduledAppointments(patient.id);
        case 'doctor':
            console.log('entrou caso 2')
            const {
                rows: [doctor],
              } = await patientRepository.findByUserId(user.id);
            return await appointmentRepository.getPatientAppointments(patient.id);
    
        default:
            break;
    }
}

async function getHistory(user){
    
}

export default { getFreeAppointments, create, schedule, updateStatus, getScheduledAppointments, getHistory };
