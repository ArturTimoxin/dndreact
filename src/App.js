import React, { Component } from "react";
import "./style/style.css";
import Item from "./components/item/Item";
import Target from "./components/target/Target";

class App extends Component {
  state = {
    targets: [],
    countOfColumnsAndRows: 5,
  };

  componentDidMount() {
    let startTargets = [];
    for (let i = 0; i < this.state.countOfColumnsAndRows; i++) {
      startTargets.push([]);
      for (let j = 0; j < this.state.countOfColumnsAndRows; j++) {
        startTargets[i].push(0);
      }
    }
    this.setState({ targets: startTargets });
  }

  checkTargetIsExist(newTargets, row, column) {
    if (column < 0 || row < 0) {
      console.log("Target is not exist");
      return false;
    } else if (row > this.state.countOfColumnsAndRows - 1) {
      // -1 т.к. нач. и все послед массив у нас 0 1 2 3 4 - колонок
      //добавляем колонку путём добавляения каждому из масиивов еще одного значение
      console.log("add new row");
      let newRow = [];
      for (let i = 0; i < this.state.countOfColumnsAndRows; i++) {
        newRow.push(0); // заполняем новую строку нулями
      }
      console.log(newRow);
      newTargets.push(newRow); // добавляем новую строку
      return true;
    } else if (column > this.state.countOfColumnsAndRows - 1) {
      // -1 т.к. нач. и все послед массив у нас 0 1 2 3 4 - строк
      //добавляем строку путём добавляения еще одного массива той же размерности
      console.log("add new column");
      console.log("Before: " + newTargets);
      for (let i = 0; i < this.state.countOfColumnsAndRows; i++) {
        newTargets[i].push(0);
      }
      console.log("After: " + newTargets);
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
        console.log("1");
        newTargets[row - 1][column] = 1;
        this.setState({ targets: newTargets });
        return;
      } else if (this.checkTargetIsExist(newTargets, row, column + 1)) {
        if (!newTargets[row][column + 1]) {
          console.log("2");
          newTargets[row][column + 1] = 1;
          this.setState({ targets: newTargets });
          return;
        } else if (this.checkTargetIsExist(newTargets, row + 1, column)) {
          if (!newTargets[row + 1][column]) {
            console.log("3");
            newTargets[row + 1][column] = 1;
            this.setState({ targets: newTargets });
            return;
          } else if (this.checkTargetIsExist(newTargets, row, column - 1)) {
            if (!newTargets[row][column - 1]) {
              console.log("4");
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
                return singleArrayTargets.map((singleItem, j) => {
                  return (
                    <Target
                      key={i + "" + j}
                      idRow={i}
                      idColumn={j}
                      isEmpty={singleItem}
                      handleClick={this.handleClick}
                    />
                  );
                });
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
