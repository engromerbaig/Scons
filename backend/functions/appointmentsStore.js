// Shared in-memory store (resets on function instance restart)
let appointments = [];

module.exports = {
  getAppointments: () => appointments,
  addAppointment: (appointment) => {
    appointments.push(appointment);
    return appointment;
  },
};