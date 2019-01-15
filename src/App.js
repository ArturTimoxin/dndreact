import React, { Component } from "react";
import "./style/style.css";
import Item from "./components/item/Item";
import Target from "./components/target/Target";

class App extends Component {
  state = {
    targets: [],
    countOfColumnsAndRows: 10,
  };

  // array = [{color: red}, {color: blue}, {color: green}]

  // getBla(el){
  //   let index = array.findIndex(el)
  //   array[index].color = black
  //   array.push({color: perrple })
  //   array.unshift({color: grey})
  // }

  // array.map((el, index)=>{
  //   if(index of every row)
  // })

  // map ( el => getBla(el))

  componentDidMount() {
    let startTargets = [];
    for (let i = 0; i < Math.pow(this.state.countOfColumnsAndRows, 2); i++) {
      startTargets.push({ id: i, color: "white" });
    }
    this.setState({ targets: startTargets });
  }

  setCountOfGridRowsAndColumns(count) {
    let countOfColumnsAndRows = "";
    for (let i = 0; i < count; i++) {
      countOfColumnsAndRows += count + "fr ";
    }
    return countOfColumnsAndRows;
  }

  setNewTargets(id) {
    if (id < 0) {
      console.log("target is not exist");
    } else if (id > Math.pow(this.state.countOfColumnsAndRows, 2) - 1) {
      // изменения тут чтобы изменялись индексы цветов, но сохранялся вид
      const newTargets = this.state.targets;
      for (let i = 0; i < this.state.countOfColumnsAndRows * 2 + 1; i++) {
        newTargets.push({
          id: Math.pow(this.state.countOfColumnsAndRows, 2) + i,
          color: "white",
        });
      }
      this.setState({ targets: newTargets });
    } else {
      const newTargets = this.state.targets.map(target =>
        target.id === id ? { ...target, color: "lightgreen" } : target,
      );
      this.setState({ targets: newTargets });
    }
  }

  checkTargetIsEmpty(id) {
    if (id < 0) {
      console.log("target is not exist");
      return false;
    } else if (id > Math.pow(this.state.countOfColumnsAndRows, 2) - 1) {
      this.setState({ countOfColumnsAndRows: this.state.countOfColumnsAndRows + 1 });
      return true;
    } else {
      if (this.state.targets[id].color === "white") {
        return true;
      }
    }
  }

  handleClick = id => {
    // this.setState.targets[id]({ color: "lightgreen" }); - нельзя
    console.log(id);
    if (this.checkTargetIsEmpty(id)) {
      this.setNewTargets(id);
    } else if (this.checkTargetIsEmpty(id - this.state.countOfColumnsAndRows)) {
      this.setNewTargets(id - this.state.countOfColumnsAndRows);
    } else if (this.checkTargetIsEmpty(id + 1)) {
      this.setNewTargets(id + 1);
    } else if (this.checkTargetIsEmpty(id + this.state.countOfColumnsAndRows)) {
      this.setNewTargets(id + this.state.countOfColumnsAndRows);
    } else if (this.checkTargetIsEmpty(id - 1)) {
      this.setNewTargets(id - 1);
    }
  };

  render() {
    const { targets, countOfColumnsAndRows } = this.state;
    return (
      <div className="App">
        <div className="wrapper">
          <div className="itemContainer">
            <Item />
          </div>
          <header>Drag'n'Drop App</header>
          <div
            className="targetGrid"
            style={{
              gridTemplateColumns: this.setCountOfGridRowsAndColumns(countOfColumnsAndRows),
              gridTemplateRows: this.setCountOfGridRowsAndColumns(countOfColumnsAndRows),
            }}
          >
            {targets.map(singleTarget => {
              return (
                <Target
                  key={singleTarget.id}
                  idTarget={singleTarget.id}
                  color={singleTarget.color}
                  handleClick={this.handleClick}
                />
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
