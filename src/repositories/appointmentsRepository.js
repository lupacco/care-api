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

async function getAllAppointments() {
  return await connectionDb.query("SELECT * FROM appointments");
}

export default { getAllAppointments, create };
