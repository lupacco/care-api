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
  return await connectionDb.query(`
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
  `);
}

async function getAppointment(date, time, doctorId){
    return await connectionDb.query(`
    SELECT * 
    FROM appointments 
    WHERE 
    "scheduledDate"=$1 AND 
    "scheduledTime"=$2 AND 
    "doctorId"=$3
    `,[date,time,doctorId])
}

async function schedule(id, patientId){
    return await connectionDb.query(`
    UPDATE appointments 
    SET status='scheduled', 
    "userId"=$1 
    WHERE id=$2
    `,[patientId,id])
}

export default {getAppointment, getFreeAppointments, create, schedule };
