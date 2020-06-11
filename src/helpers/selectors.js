export function getAppointmentsForDay(state, day) {
  const appointments = [];
  const currentDay = state.days.find(x => x.name === day);
  currentDay && currentDay.appointments.forEach((x) => {
      x in state.appointments && appointments.push(state.appointments[x]);
  });
  return appointments;
}

export function getInterview(state, interview) {
  if (interview === null) {
    return interview;
  }

  const interviewObj = {};
  const interviewer = state.interviewers[interview.interviewer];
  interviewObj.interviewer = interviewer;
  interviewObj.student = interview.student;

  return interviewObj;
}