import React from "react";
import classNames from "classnames";

import "components/DayListItem.scss";

const formatSpots = (spots) => {
  let output = '';
  if (spots === 0) {
    output = 'no spots remaining'
  } else if (spots === 1) {
    output = `${spots} spot remaining`;
  } else {
    output = `${spots} spots remaining`;
  }

  return output;
}

export default function DayListItem(props) {

  let dayClass = classNames('day-list__item', {
    "day-list__item--selected": props.selected,
    "day-list__item--full": props.spots === 0
  });

  return (
    <li
      className={dayClass}
      onClick={() => props.setDay(props.name)}
    >
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{formatSpots(props.spots)}</h3>
    </li>
  );
}