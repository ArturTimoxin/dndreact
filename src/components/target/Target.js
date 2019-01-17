import React, { Component } from "react";
import { DropTarget } from "react-dnd";

const targetSource = {
  drop(props, monitor, component) {
    props.handleDrop(props.idRow, props.idColumn);
  },
};

function collect(connect, monitor) {
  // обязательно для обертки библиотеки
  return {
    connectDropTarget: connect.dropTarget(),
    hovered: monitor.isOver(), // Вызывается, когда элемент находится над компонентом.
    item: monitor.getItem(),
  };
}

class Target extends Component {
  render() {
    const { connectDropTarget, hovered, idRow, idColumn, isEmpty } = this.props;
    const hoverColorTarget = hovered ? "yellow" : "white";
    const colorTarget = isEmpty ? "lightgreen" : hoverColorTarget;
    return connectDropTarget(
      <div className="target" id={idRow + "" + idColumn} style={{ backgroundColor: colorTarget }} />,
    );
  }
}

export default DropTarget("itemDrag", targetSource, collect)(Target);
