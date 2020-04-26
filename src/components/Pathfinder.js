import React, { useState, useEffect } from "react";
import "./App.css";

const Pathfinder = () => {
  const [board, setBoard] = useState("");

  //render initial board with starting and ending node
  useEffect(() => {
    const startingBoard = initiateBoard({});
    // console.log(startingBoard);
    // setBoard(startingBoard);
    setBoard(startingBoard);
  }, []);

  //getting initialBoard
  const initiateBoard = data => {
    const width = 20;
    const height = 20;
    let grid = [];
    for (let row = 0; row < width; row++) {
      let currNodes = [];
      for (let col = 0; col < height; col++) {
        currNodes.push(createNodes(row, col));
      }
      grid.push(currNodes);
    }
    return grid;
  };

  //create nodes with all relevant data
  const createNodes = (row, col) => {
    return {
      row: row,
      col: col,
      value: row + col,
      visited: false,
      distance: Infinity,
      parent: undefined,
      start: false,
      end: false
    };
  };



  return <div className="pathfinder">Pathfinder</div>;
};

export default Pathfinder;
