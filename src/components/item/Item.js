import React, { Component } from "react";
import { DragSource } from "react-dnd";

const itemSource = {
  beginDrag(props) {
    props.changeItemText("Drop off me");
    return {};
  },
  endDrag(props, monitor) {
    props.changeItemText("Drag me");
  },
};

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    connectDragPrewiew: connect.dragPreview(),
    isDragging: monitor.isDragging(),
  };
}

class Item extends Component {
  render() {
    const { connectDragSource, itemText } = this.props;
    return connectDragSource(
      <div className="itemDrag" draggable="true">
        {itemText}
      </div>,
    );
  }
}

export default DragSource("itemDrag", itemSource, collect)(Item);
