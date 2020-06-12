import { useState } from 'react';

const useVisualMode = (initial) => {

  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = (mode, replace = false) => {

    // create a historyArr variable out of history state
    // this way the original history state will remain immutable
    const historyArr = [...history];
    
    // if replace parameter is true, replace the last value in the history array with a new one
    if (replace) {
      historyArr[historyArr.length - 1] = mode;

    // if replace parameter is false, add the new value to the array without replacing an existing value at the end of the history array
    } else {
      historyArr.push(mode);
    }

    // set mode to the last element of the history array (it is the new value that was added above)
    setMode(historyArr[historyArr.length - 1]);

    // set history state to be equal to historyArr to reflect the changes that were made
    setHistory(historyArr);
  }

  const back = () =>  {

    const historyArr = [...history];

    // if history contains more than 1 value, remove it
    if (historyArr.length > 1) {
      historyArr.pop();
    }

     // set mode to the last element of the history array
    setMode(historyArr[historyArr.length - 1]);

    setHistory(historyArr);
  }

  return { mode, transition, back };
};

export default useVisualMode;