export function getAppointmentsForDay(state, day) {
  const appointments = [];
  const currentDay = state.days.find(x => x.name === day);
  currentDay && currentDay.appointments.forEach((x) => {
      x in state.appointments && appointments.push(state.appointments[x]);
  });
  return appointments;
}

export function getInterviewersForDay(state, day) {
  const interviewers = [];
  const currentDay = state.days.find(x => x.name === day);
  currentDay && currentDay.interviewers.forEach((x) => {
      x in state.interviewers && interviewers.push(state.interviewers[x]);
  });
  return interviewers;
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