import React from "react";

const Target = props => {
  const handleClick = e => props.handleClick(props.idRow, props.idColumn);
  let colorTarget = props.isEmpty ? "lightgreen" : "white";
  return (
    <div
      className="target"
      id={props.idColumn + "" + props.idRow}
      onClick={handleClick}
      style={{ background: colorTarget }}
    />
  );
};

export default Target;
