import React from "react";

const Item = props => {
  return (
    <div className="itemDrag" id={props.id} draggable="true">
      Drag me
    </div>
  );
};

export default Item;
