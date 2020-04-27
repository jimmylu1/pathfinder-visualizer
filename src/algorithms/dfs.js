import { findNeighbors, findShortestPath } from "./helper";

//DFS algorithm
export const DFS = (startNode, endNode, board) => {
  let stack = [];
  let visited = [];
  stack.push(board[startNode.row][startNode.col]);

  while (stack.length > 0) {
    let currNode = stack.pop();
    currNode.visited = true;
    visited.push(currNode);
    if (currNode.row === endNode.row && currNode.col === endNode.col) break;
    let neighbors = findNeighbors(board, currNode.row, currNode.col);
    for (const neighbor of neighbors) {
      if (!neighbor.visited && !neighbor.isWall) {
        neighbor.parent = currNode;
        stack.push(neighbor);
      }
    }
  }
  return {
    path: findShortestPath(board, endNode),
    visited
  };
};
