import errors from "../errors/index.js";
import appointmentsRepository from "../repositories/appointmentsRepository.js";
import doctorRepository from "../repositories/doctorRepository.js";
import patientRepository from "../repositories/patientRepository.js";

async function getFreeAppointments() {
  const { rows } = await appointmentsRepository.getFreeAppointments();
  return rows;
}

async function create(user, date, time) {
  if (user.type !== "doctor") throw errors.invalidTypeOfUserError();

  const {
    rowCount,
    rows: [doctor],
  } = await doctorRepository.findByUserId(user.id);

  if (!rowCount) throw errors.notFoundError();

  const appointmentExist = await appointmentsRepository.getAppointment(
    date,
    time,
    doctor.id
  );

  if (appointmentExist.rowCount)
    throw errors.conflictError("Appointment already exists");

  await appointmentsRepository.create(date, time, doctor.id);
}

async function schedule(user, id) {
  if (user.type !== "patient") throw errors.invalidTypeOfUserError();
  const {
    rows: [patient],
  } = await patientRepository.findByUserId(user.id);

  const {
    rows: [appointment],
  } = await appointmentsRepository.findById(id);
  if (appointment.status !== "free")
    throw errors.conflictError("This appointment is not available");
  console.log("chegou aqui");
  await appointmentsRepository.schedule(id, patient.id);
}

async function updateStatus(id, status, user) {
  if (user.type !== "doctor") throw errors.invalidTypeOfUserError();
  
  switch (status) {
    case "cancel":
      await appointmentsRepository.cancel(id);
      break;
    case "confirm":
      await appointmentsRepository.confirm(id);
      break;
    case "finish":
      await appointmentsRepository.finish(id);
      break
    case "free":
      await appointmentsRepository.free(id);
      break
    default:
      throw errors.notFoundError();
  }
}

export default { getFreeAppointments, create, schedule, updateStatus };
