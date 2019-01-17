import React, { Component } from "react";
import { DragSource } from "react-dnd";

const itemSource = {
  // обязательный объект для обертки
  beginDrag(props) {
    props.changeItemText("Drop off me");
    return {}; // функция должна возвращать объект
  },
  endDrag(props, monitor) {
    props.changeItemText("Drag me");
  },
};

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(), // dragSource возвр фцию которая передаётся компотненту чтобы подкл DOM элм к библ React DnD
    connectDragPrewiew: connect.dragPreview(), // предварительный просмотр при перетаскивании элемента DOM (при перетаскивании эл-т будет "заскриншотен" т.е перетаскивание эл-та мышью)
    isDragging: monitor.isDragging(), // возвр true если выполниться перетаскивание
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
