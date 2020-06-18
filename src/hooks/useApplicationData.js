import { useState, useEffect } from "react";
import axios from "axios";
import { updateRemainingSpotsForDay } from "../helpers/selectors";

const useApplicationData = () => {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: [],
    interviewers: [],
  });

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    return axios.put(`/api/appointments/${id}`, { interview }).then(() => {
      // update state with a new appointments array
      setState({
        ...state,
        appointments,
      });

      // update state with a new days array (remaining spots are calculated based on the updated appointments)
      setState((prev) => {
        const days = updateRemainingSpotsForDay(prev, prev.day);
        return {
          ...prev,
          days,
        };
      });
    });
  }

  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    return axios.delete(`/api/appointments/${id}`).then(() => {
      // update the state with a new appointments array
      setState({
        ...state,
        appointments,
      });

      // update state with a new days array (remaining spots are calculated based on the updated appointments)
      setState((prev) => {
        const days = updateRemainingSpotsForDay(prev, prev.day);
        return {
          ...prev,
          appointments,
          days,
        };
      });
    });
  }

  const setDay = (day) => setState({ ...state, day });

  // make a get request to the API server, retrieve data and populate the state with it (happens one time)
  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
    ]).then((all) => {
      // copy the previous state, then add new data to it
      setState((prev) => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data,
      }));
    });
  }, []);

  return { state, setDay, bookInterview, cancelInterview };
};

export default useApplicationData;
