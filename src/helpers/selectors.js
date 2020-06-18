export function getAppointmentsForDay(state, day) {
  const appointments = [];
  const currentDay = state.days.find((x) => x.name === day);
  currentDay &&
    currentDay.appointments.forEach((x) => {
      x in state.appointments && appointments.push(state.appointments[x]);
    });
  return appointments;
}

export function getInterviewersForDay(state, day) {
  const interviewers = [];
  const currentDay = state.days.find((x) => x.name === day);
  currentDay &&
    currentDay.interviewers.forEach((x) => {
      x in state.interviewers && interviewers.push(state.interviewers[x]);
    });
  return interviewers;
}

export function updateRemainingSpotsForDay(state, day) {
  let spotsCounter = 0;
  const appointments = getAppointmentsForDay(state, day);

  // count the number of days where interview is null
  appointments.forEach((appointment) => {
    if (appointment.interview === null) {
      spotsCounter += 1;
    }
  });

  // Extract current day object from state.days
  const dayObj = state.days.find((x) => x.name === day);

  // Set its spots field to our calculated number of spots
  dayObj.spots = spotsCounter;

  // Get index of the current day inside state.days
  const index = state.days.findIndex((x) => x.name === day);

  // Make a copy of state.days array
  const days = [...state.days];

  // Replace day at index with our updated dayObj
  days[index] = dayObj;

  return days;
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
