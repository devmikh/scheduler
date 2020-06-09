import React from 'react';
import classNames from 'classnames';
import "./InterviewerListItem.scss";

const InterviewerListItem = (props) => {

  let interviewerClass = classNames("interviewers__item", {
    "interviewers__item--selected": props.selected
  });

  return (
    <li
      key={props.id}
      className={interviewerClass}
      onClick={() => props.setInterviewer(props.name)}
    >
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.name}
      />
      {props.selected ? props.name : ""}
    </li>
  );
};

export default InterviewerListItem;