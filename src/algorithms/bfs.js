import { findNeighbors, findShortestPath } from "./helper";

//BFS algorithm
export const BFS = (startNode, endNode, board) => {
  let start = board[startNode.row][startNode.col],
    end = board[endNode.row][endNode.col];
  let visited = [];
  let q = [start];

  while (q.length) {
    let currNode = q.shift();
    currNode.visited = true;
    visited.push(currNode);
    //found end node
    if (currNode.row === end.row && currNode.col === end.col) break;
    const neighbors = findNeighbors(board, currNode.row, currNode.col);
    for (const neighbor of neighbors) {
      if (!neighbor.visited && !neighbor.isWall) {
        neighbor.prev = currNode;
        q.push(neighbor);
      }
    }
  }
  let shortestPath = findShortestPath(board, endNode);
  let res = {
    path: shortestPath,
    visited
  };

  return res;
};
