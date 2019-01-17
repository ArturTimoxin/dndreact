import React, { Component } from "react";
import "./style/style.css";
import HTML5Backend from "react-dnd-html5-backend";
import { DragDropContext } from "react-dnd";
import Item from "./components/item/Item";
import Target from "./components/target/Target";

class App extends Component {
  state = {
    targets: [],
    itemText: "Drag me",
  };

  componentDidMount() {
    let startTargets = [];
    for (let i = 0; i < 5; i++) {
      startTargets.push([]);
      for (let j = 0; j < 5; j++) {
        startTargets[i].push(0);
      }
    }
    this.setState({ targets: startTargets });
  }

  checkTargetIsExist(newTargets, row, column) {
    if (column < 0 || row < 0) {
      console.log("Target is not exist");
      return false;
    } else if (row > this.state.targets.length - 1 || column > this.state.targets[0].length - 1) {
      let newRow = [];
      for (let i = 0; i < this.state.targets[0].length; i++) {
        newRow.push(0);
      }
      newTargets.push(newRow);
      for (let i = 0; i < this.state.targets.length; i++) {
        newTargets[i].push(0);
      }
      return true;
    } else {
      return true;
    }
  }

  handleDrop = (row, column) => {
    var newTargets = this.state.targets;
    if (!newTargets[row][column]) {
      newTargets[row][column] = 1;
      this.setState({ targets: newTargets });
    } else if (row === 0 && this.checkTargetIsExist(newTargets, row, column + 1)) {
      //случай для 0 строки
      if (!newTargets[row][column + 1]) {
        newTargets[row][column + 1] = 1;
        this.setState({ targets: newTargets });
        return;
      } else if (!newTargets[row + 1][column]) {
        newTargets[row + 1][column] = 1;
        this.setState({ targets: newTargets });
        return;
      } else if (this.checkTargetIsExist(newTargets, row, column - 1)) {
        newTargets[row][column - 1] = 1;
        this.setState({ targets: newTargets });
        return;
      }
    } else if (this.checkTargetIsExist(newTargets, row - 1, column)) {
      // далее проверка по часовой
      if (!newTargets[row - 1][column]) {
        newTargets[row - 1][column] = 1;
        this.setState({ targets: newTargets });
        return;
      } else if (this.checkTargetIsExist(newTargets, row, column + 1)) {
        if (!newTargets[row][column + 1]) {
          newTargets[row][column + 1] = 1;
          this.setState({ targets: newTargets });
          return;
        } else if (this.checkTargetIsExist(newTargets, row + 1, column)) {
          if (!newTargets[row + 1][column]) {
            newTargets[row + 1][column] = 1;
            this.setState({ targets: newTargets });
            return;
          } else if (this.checkTargetIsExist(newTargets, row, column - 1)) {
            if (!newTargets[row][column - 1]) {
              newTargets[row][column - 1] = 1;
              this.setState({ targets: newTargets });
              return;
            }
          }
        }
      }
    }
  };

  changeItemText = itemText => {
    this.setState({
      itemText: itemText,
    });
  };

  render() {
    const { targets, itemText } = this.state;
    return (
      <div className="App">
        <div className="wrapper">
          <div className="itemContainer">
            <Item itemText={itemText} changeItemText={this.changeItemText} />
          </div>
          <div className="mainWrapper">
            <header>
              <p>Drag'n'Drop App</p>
            </header>
            <div className="targetGrid">
              {targets.map((singleArrayTargets, i) => {
                return (
                  <div className="targetRow" key={i} id={i}>
                    {singleArrayTargets.map((singleItem, j) => {
                      return (
                        <Target
                          key={i + "" + j}
                          idRow={i}
                          idColumn={j}
                          isEmpty={singleItem}
                          handleDrop={this.handleDrop}
                        />
                      );
                    })}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default DragDropContext(HTML5Backend)(App);
