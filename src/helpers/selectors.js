export function getAppointmentsForDay(state, day) {
  const appointments = [];
  const currentDay = state.days.find(x => x.name === day);
  currentDay && currentDay.appointments.forEach((x) => {
      x in state.appointments && appointments.push(state.appointments[x]);
  });
  return appointments;
}