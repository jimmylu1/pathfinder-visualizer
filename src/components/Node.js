import React, { Component } from "react";
import Proptypes from "prop-types";

import "./Node.css";

export default class Node extends Component {
  constructor(props) {
    super(props);
    const { row, col } = props;
    this.state = {
      row,
      col,
      hover: false
    };

    this.toggleMouse = this.toggleMouse.bind(this);
  }

  //handle mouse toggle on hover of each node
  toggleMouse() {
    this.setState(prevState => ({
      hover: !prevState.hover
    }));
  }

  render() {
    const {
      row,
      col,
      board,
      isStart,
      isEnd,
      moveStart,
      moveEnd,
      drawWall
    } = this.props;

    const { hover } = this.state;

    let addClass = "";

    //style visited nodes
    if (board()[row][col].color) {
      addClass = "visited";
    }

    //style shortest path
    if (board()[row][col].shortest) {
      addClass = "shortest";
    }

    //toggle hover styling when not on visited or shortest path
    if (hover && (addClass !== "shortest" && addClass !== "visited")) {
      addClass = "hovering ";
    }

    //add style for start node
    if ((hover && moveStart) || isStart) {
      addClass = "start";
    }

    //add style for end node
    if ((hover && moveEnd) || isEnd) {
      addClass = "end";
    }

    //determine which nodes are walls
    if ((addClass !== "start" || addClass !== "end") && drawWall && hover) {
      board()[row][col].isWall = true;
    }

    //add styling for walls
    if (
      (addClass !== "start" || addClass !== "end") &&
      board()[row][col].isWall
    ) {
      addClass = "wall";
    }

    const { mouseDown, mouseUp } = this.props;
    const { toggleMouse } = this;
    return (
      <div
        className={`node ${addClass}`}
        onMouseEnter={() => toggleMouse()}
        onMouseLeave={() => toggleMouse()}
        onMouseDown={() => mouseDown(row, col)}
        onMouseUp={() => mouseUp(row, col)}
      ></div>
    );
  }
}

Node.propTypes = {
  row: Proptypes.number,
  col: Proptypes.number,
  hover: Proptypes.bool,
  board: Proptypes.func,
  isStart: Proptypes.bool,
  isEnd: Proptypes.bool,
  moveStart: Proptypes.bool,
  moveEnd: Proptypes.bool,
  drawWall: Proptypes.bool
};
