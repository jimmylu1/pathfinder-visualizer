import { findNeighbors, findShortestPath } from "./helper";

//DFS algorithm
export const DFS = (startNode, endNode, board) => {
  let start = board[startNode.row][startNode.col],
    end = board[endNode.row][endNode.col];
  let stack = [start];
  let visited = [];
  // stack.push(start);

  while (stack.length) {
    let currNode = stack.pop();
    currNode.visited = true;
    visited.push(currNode);
    //found end node
    if (currNode.row === end.row && currNode.col === end.col) break;
    const neighbors = findNeighbors(board, currNode.row, currNode.col);
    for (const neighbor of neighbors) {
      if (!neighbor.visited && !neighbor.isWall) {
        neighbor.prev = currNode;
        stack.push(neighbor);
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
