import React from "react";

const Target = props => {
  const handleClick = e => props.handleClick(props.idTarget);

  return <div className="target" id={props.idTarget} onClick={handleClick} style={{ backgroundColor: props.color }} />;
};

export default Target;
