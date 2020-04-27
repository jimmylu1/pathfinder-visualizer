import { findNeighbors, findShortestPath } from "./helper";

//BFS algorithm
export const BFS = (startNode, endNode, board) => {
  let start = board[startNode.row][startNode.col];

  let visited = [];
  let end = board[endNode.row][endNode.col];
  let q = [];
  q.push(start);

  while (q.length > 0) {
    let currNode = q.shift();
    currNode.visited = true;
    visited.push(currNode);

    if (currNode.isWall) continue;
    if (currNode.row === end.row && currNode.col === end.col) break;

    const neighbors = findNeighbors(board, currNode.row, currNode.col);

    neighbors.forEach(neighbor => {
      if (!neighbor.visited && !neighbor.isWall) {
        neighbor.parent = currNode;
        q.push(neighbor);
      }
    });
  }

  return {
    path: findShortestPath(board, endNode),
    visited
  };
};
