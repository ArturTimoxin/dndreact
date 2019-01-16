import React, { Component } from "react";
import "./style/style.css";
import Item from "./components/item/Item";
import Target from "./components/target/Target";

class App extends Component {
  state = {
    targets: [],
  };

  componentDidMount() {
    let startTargets = [];
    // сначала сетка 5x5
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
    } else if (row > this.state.targets.length - 1) {
      // -1 т.к. нач. и все послед массив у нас 0 1 2 3 4 - колонок
      //добавляем колонку путём добавляения каждому из масиивов еще одного значение
      console.log("add new row");
      let newRow = [];
      for (let i = 0; i < this.state.targets[0].length; i++) {
        newRow.push(0); // заполняем новую строку нулями
      }
      console.log(newRow);
      newTargets.push(newRow); // добавляем новую строку
      return true;
    } else if (column > this.state.targets[0].length - 1) {
      // -1 т.к. нач. и все послед массив у нас 0 1 2 3 4 - строк
      //добавляем строку путём добавляния еще одного массива той же размерности
      let tmpNewTargets = newTargets;
      for (let i = 0; i < this.state.targets[0].length; i++) {
        tmpNewTargets.push([]);
      }
      for (let i = 0; i < this.state.targets[0].length; i++) {
        tmpNewTargets[i].push(0);
      }
      newTargets = tmpNewTargets;
      return true;
    } else {
      return true;
    }
  }

  handleClick = (row, column) => {
    var newTargets = this.state.targets;
    if (!newTargets[row][column]) {
      newTargets[row][column] = 1;
      this.setState({ targets: newTargets });
    } else if (this.checkTargetIsExist(newTargets, row - 1, column)) {
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

  // else if (newTargets[row][column] === 1) {
  //   console.log("Target is busy");
  //   return false;
  // }

  // else {
  //   newTargets[row][column] = 1;
  //   this.setState({ targets: newTargets });
  // }

  render() {
    const { targets } = this.state;
    return (
      <div className="App">
        <div className="wrapper">
          <div className="itemContainer">
            <Item />
          </div>
          <div className="mainWrapper">
            <header>Drag'n'Drop App</header>
            <div className="targetGrid">
              {targets.map((singleArrayTargets, i) => {
                return (
                  <div className="targetRow" id={i}>
                    {singleArrayTargets.map((singleItem, j) => {
                      return (
                        <Target
                          key={i + "" + j}
                          idRow={i}
                          idColumn={j}
                          isEmpty={singleItem}
                          handleClick={this.handleClick}
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

export default App;
