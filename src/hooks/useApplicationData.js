import { useState, useEffect } from 'react';
import axios from "axios";
// import { calculateRemainingSpots } from '../helpers/selectors';

const useApplicationData = () => {
  // create state object
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: [],
    interviewers: []
  });

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    }

    const appointments = {
      ...state.appointments,
      [id]: appointment
    }

    // Get day object for the current day
    const day = state.days.find(x => x.name === state.day);

    // Find index of the current day
    const index = state.days.findIndex(x => x.name === state.day);

    // Create a copy of state's days array
    const days = [...state.days];

    // Replace the day object with a copied day object
    days[index] = day;

    return axios.put(`/api/appointments/${id}`, { interview })
      .then(() => {
        // Decrease the number of spots by 1
        day.spots -= 1;
        setState({
          ...state,
          days,
          appointments
        });
      });
  }

  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    }

    const appointments = {
      ...state.appointments,
      [id]: appointment
    }

    // Get day object for the current day
    const day = state.days.find(x => x.name === state.day);

    // Find index of the current day
    const index = state.days.findIndex(x => x.name === state.day);

    // Create a copy of state's days array
    const days = [...state.days];

    // Replace the day object with a copied day object
    days[index] = day;

    return axios.delete(`/api/appointments/${id}`)
      .then(() => {
        // Increase the number of spots by 1
        day.spots += 1;
        setState({
          ...state,
          days,
          appointments
        });
      });
  }

  const setDay = day => setState({ ...state, day });

  // make a get request to the API server, retrieve data and populate the state with it (happens one time)
  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers")
    ]).then((all) => {

      // copy the previous state, then add new data to it
        setState(prev => ({ ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data }));
      })
  }, []);

  return { state, setDay, bookInterview, cancelInterview };
}

export default useApplicationData;