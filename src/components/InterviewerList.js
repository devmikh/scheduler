import React from 'react';
import "./InterviewerList.scss";
import PropTypes from 'prop-types';

import InterviewListItem from './InterviewerListItem';

const InterviewerList = (props) => {

  const interviewers = props.interviewers.map((interviewer) => {
    return (
      <InterviewListItem 
        key={interviewer.id}
        name={interviewer.name}
        avatar={interviewer.avatar}
        selected={interviewer.id === props.value}
        setInterviewer={() => props.onChange(interviewer.id)}
      />
    )
  });

  InterviewerList.propTypes = {
    value: PropTypes.number,
    onChange: PropTypes.func.isRequired
  };

  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">
        {interviewers}
      </ul>
    </section>
  )
  
}


export default InterviewerList;