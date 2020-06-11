import { useState } from 'react';

const useVisualMode = (initial) => {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = (mode, replace = false) => {
    const historyArr = [...history];
    
    if (replace) {
      historyArr[historyArr.length - 1] = mode;
    } else {
      historyArr.push(mode);
    }

    setMode(historyArr[historyArr.length - 1]);
    setHistory(historyArr);
  }

  const back = () =>  {
    const historyArr = [...history];
    if (historyArr.length > 1) {
      historyArr.pop();
    }
    setMode(historyArr[historyArr.length - 1]);
    setHistory(historyArr);
  }

  return { mode, transition, back };
};

export default useVisualMode;