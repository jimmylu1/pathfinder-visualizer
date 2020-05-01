import React, { Component } from "react";
import Node from "./Node";
import Proptypes from "prop-types";

//styling
import "./Pathfinder.css";
import { ALGORITHMS, INITIALSTATE } from "./constants.js";

export default class Pathfinder extends Component {
  constructor() {
    super();

    //initial state of board and default algorithm
    this.state = {
      ...INITIALSTATE,
      algorithm: "dfs"
    };

    this.getBoard = this.getBoard.bind(this);
    this.mouseDown = this.mouseDown.bind(this);
    this.mouseUp = this.mouseUp.bind(this);
    this.startSearch = this.startSearch.bind(this);
    this.getInitialBoard = this.getInitialBoard.bind(this);
    this.reset = this.reset.bind(this);
  }

  //on start, render the basic board
  componentDidMount() {
    let board = this.getInitialBoard({});
    this.setState({ board });
  }

  //generate board populated with nodes
  getInitialBoard(b) {
    const { width, height } = this.state;
    let board = [];
    for (let row = 0; row < width; row++) {
      let currNodes = [];
      for (let col = 0; col < height; col++) {
        currNodes.push(this.generateNode(row, col));
      }
      board.push(currNodes);
    }
    return board;
  }

  //generate nodes with data from initial board
  generateNode(row, col) {
    return {
      row: row,
      col: col,
      val: row + col,
      visited: false,
      distance: Infinity,
      parent: undefined,
      isStart: false,
      isEnd: false
    };
  }

  //need to retrieve current state of the board to get state of each node to determine next action
  getBoard() {
    return this.state.board;
  }

  //handle moving start or end node on mouse down
  mouseDown(inputRow, inputCol) {
    const { startNode, endNode } = this.state;
    //if mouse on startNode, update state
    if (inputRow === startNode.row && inputCol === startNode.col) {
      this.setState({ moveStart: true });
      //if mouse on endNode, updateState
    } else if (inputRow === endNode.row && inputCol === endNode.col) {
      this.setState({ moveEnd: true });
    } else {
      this.setState({ drawWall: true });
    }
  }

  //handle stop moving start or end node on mouse up
  mouseUp(row, col) {
    //end moving start node and update start node to new coordinates
    const { moveStart, moveEnd } = this.state;
    if (moveStart) {
      this.setState({ moveStart: false });
      this.setState(prevState => ({
        startNode: {
          ...prevState.startNode,
          row: row,
          col: col
        }
      }));
      //end moving end node and update end node to new coordinates
    } else if (moveEnd) {
      this.setState({ moveEnd: false });
      this.setState(prevState => ({
        endNode: {
          ...prevState.endNode,
          row: row,
          col: col
        }
      }));
    } else {
      this.setState({ drawWall: false });
    }
  }

  //reset board to original state
  reset() {
    const { algorithm } = this.state;
    let board = this.getInitialBoard({});
    this.setState({
      ...INITIALSTATE,
      board,
      algorithm: algorithm
    });
  }

  //animation to start search
  startSearch(algorithm) {
    const { board, startNode, endNode } = this.state;
    let res = ALGORITHMS[algorithm](startNode, endNode, board);
    //loop through visited nodes generated by algorithm and highlight visited nodes
    for (let i = 0; i < res.visited.length; i++) {
      setTimeout(() => {
        let currNode = res.visited[i];
        let newBoard = board.slice();
        newBoard[currNode.row][currNode.col].color = true;
        this.setState({ board: newBoard });
        if (i === res.visited.length - 1) {
          this.animateSolution(res, board);
        }
      }, i * 30);
    }
  }

  // animation to find path after first
  animateSolution(res, board) {
    for (let i = 0; i < res.path.length; i++) {
      setTimeout(() => {
        let currNode = res.path[i];
        let newBoard = board.slice();
        newBoard[currNode.row][currNode.col].shortest = true;
        this.setState({ board: newBoard });
      }, i * 50);
    }
  }

  render() {
    const {
      startNode,
      endNode,
      drawWall,
      moveStart,
      moveEnd,
      board,
      algorithm
    } = this.state;
    const {
      getBoard,
      toggleMouse,
      mouseUp,
      mouseDown,
      reset,
      startSearch
    } = this;

    const startRow = startNode.row;
    const startCol = startNode.col;
    const endRow = endNode.row;
    const endCol = endNode.col;

    return (
      <div className="pathfinder">
        <h1 className="header">Pathfinder Visualizer</h1>
        <select
          className="selector"
          onChange={algorithm => {
            this.setState({
              algorithm: algorithm.target.value
            });
          }}
          value={algorithm}
        >
          {Object.keys(ALGORITHMS).map(key => {
            return <option value={key}>{key}</option>;
          })}
        </select>
        <button className="startButton" onClick={() => startSearch(algorithm)}>
          Start
        </button>
        <button className="resetButton" onClick={() => reset()}>
          Reset
        </button>
        <div
          style={{
            width: 900,
            height: 600,
            margin: "0px auto",
            marginTop: "20px"
          }}
          className="board"
        >
          {board.map((nodeRow, rowIdx, key) => {
            return nodeRow.map((nodeCol, colIdx, key) => {
              return (
                <div className="node">
                  <Node
                    row={rowIdx}
                    key={key}
                    col={colIdx}
                    board={getBoard}
                    mouseDown={mouseDown}
                    mouseUp={mouseUp}
                    toggleMouse={toggleMouse}
                    isStart={startRow === rowIdx && startCol === colIdx}
                    isEnd={endRow === rowIdx && endCol === colIdx}
                    moveStart={moveStart}
                    moveEnd={moveEnd}
                    drawWall={drawWall}
                  />{" "}
                </div>
              );
            });
          })}
        </div>
      </div>
    );
  }
}

Pathfinder.propTypes = {
  algoritm: Proptypes.func,
  INITIALSTATE: Proptypes.shape({
    width: Proptypes.number,
    height: Proptypes.number,
    board: Proptypes.array,
    moveStart: Proptypes.bool,
    moveEnd: Proptypes.bool,
    drawWall: Proptypes.bool,
    startNode: Proptypes.object,
    endNode: Proptypes.object
  })
};
