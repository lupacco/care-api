import connectionDb from "../config/database.js";

async function create(date, time, doctorId) {
  return await connectionDb.query(
    `
    INSERT INTO appointments ("scheduledDate", "scheduledTime",  "doctorId")
    VALUES ($1, $2, $3)
    `,
    [date, time, doctorId]
  );
}

async function getFreeAppointments() {
  return await connectionDb.query(
    `
    SELECT 
    appointments."scheduledDate",
    appointments."scheduledTime",
    appointments.status,
    users.name AS "doctorName",
    doctors.speciality 
    FROM appointments 
    JOIN doctors 
      ON appointments."doctorId" = doctors.id
    JOIN users 
        ON doctors."userId" = users.id
    WHERE appointments.status='free'
  `
  );
}

async function getAppointment(date, time, doctorId) {
  return await connectionDb.query(
    `
    SELECT * 
    FROM appointments 
    WHERE 
    "scheduledDate"=$1 AND 
    "scheduledTime"=$2 AND 
    "doctorId"=$3
    `,
    [date, time, doctorId]
  );
}

async function findById(id){
    return await connectionDb.query(`
    SELECT * FROM appointments WHERE id = $1
    `,[id])
}

async function schedule(id, patientId) {
  return await connectionDb.query(
    `
    UPDATE appointments 
    SET status='scheduled', 
    "patientId"=$1 
    WHERE id=$2
    `,
    [patientId, id]
  );
}

async function cancel(id) {
  return await connectionDb.query(
    `
    UPDATE appointments 
    SET status='canceled', 
    WHERE id=$1
    `,
    [id]
  );
}

async function confirm(id) {
  return await connectionDb.query(
    `
    UPDATE appointments 
    SET status='confirmed' 
    WHERE id=$1
    `,
    [id]
  );
}

async function finish(id) {
  return await connectionDb.query(
    `
    UPDATE appointments 
    SET status='done' 
    WHERE id=$1
    `,
    [id]
  );
}

async function free(id) {
  return await connectionDb.query(
    `
    UPDATE appointments 
    SET status='free', 
    "patientId"=NULL
    WHERE id=$1
    `,
    [id]
  );
}

export default {
  getAppointment,
  getFreeAppointments,
  findById,
  create,
  schedule,
  cancel,
  confirm,
  finish,
  free,
};
