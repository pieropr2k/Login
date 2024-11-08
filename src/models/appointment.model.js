import db from "../database.js";

const AppointmentModel = {
  // Crear una cita
  createAppointment: (appointment) => {
    //console.log(appointment);
    //console.log("appointment");
    return new Promise((resolve, reject) => {
      const query = `INSERT INTO appointments (title, description, date, user_id) VALUES (?, ?, ?, ?)`;
      const params = [appointment.title, appointment.description, appointment.date, appointment.user_id];
      db.run(query, params, function (err) {
        if (err) {
          return reject(err);
        }
        resolve(this.lastID);
      });
    });
  },

  // Obtener todas las citas
  getAllAppointments: (userId) => {
    return new Promise((resolve, reject) => {
      const query = `
        SELECT appointments.* FROM appointments
        WHERE appointments.user_id = ?
      `;
      
      db.all(query, [userId], (err, rows) => {
        if (err) {
          return reject(err);
        }
        console.log(rows);
        resolve(rows);
      });
    });
  },

  // Obtener una cita por ID
  getAppointmentById: (id) => {
    return new Promise((resolve, reject) => {
      const query = `
        SELECT appointments.* FROM appointments WHERE appointments.id = ?
      `;
      db.get(query, [id], (err, row) => {
        if (err) {
          return reject(err);
        }
        resolve(row);
      });
    });
  },

  // Actualizar una cita
  updateAppointment: (id, appointment) => {
    console.log('updateAppointment', id, appointment);
    return new Promise((resolve, reject) => {
      const query = `UPDATE appointments SET title = ?, description = ?, date = ?, user_id = ? WHERE id = ?`;
      const params = [appointment.title, appointment.description, appointment.date, appointment.user_id, id];
      db.run(query, params, function (err) {
        if (err) {
          return reject(err);
        }
        resolve(this.changes);
      });
    });
  },

  // Eliminar una cita
  deleteAppointment: (id) => {
    return new Promise((resolve, reject) => {
      const query = `DELETE FROM appointments WHERE id = ?`;
      db.run(query, [id], function (err) {
        if (err) {
          return reject(err);
        }
        resolve(this.changes);
      });
    });
  }
};

export default AppointmentModel;