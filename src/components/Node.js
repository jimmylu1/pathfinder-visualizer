import React, { Component } from "react";

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
      hoverStart,
      hoverEnd,
      drawWall
    } = this.props;

    const { hover } = this.state;

    let addClass = "";

    //toggle hover styling
    if (hover) {
      addClass = "hovering ";
    }

    //add style for start node
    if ((hover && hoverStart) || isStart) {
      addClass = "start";
    }

    //add style for end node
    if ((hover && hoverEnd) || isEnd) {
      addClass = "end";
    }

    //determine which nodes are walls
    if (drawWall && hover) {
      board()[row][col].isWall = true;
    }

    //add styling for walls
    if (board()[row][col].isWall) {
      addClass = "wall";
    }

    if (board()[row][col].color) {
      addClass = "visited";
    }

    if (board()[row][col].shortest) {
      addClass = "shortest";
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
