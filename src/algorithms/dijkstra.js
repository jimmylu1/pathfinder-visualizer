import { findNeighbors, findShortestPath } from "./helper";

export function dijkstra(startNode, endNode, grid) {
  const start = grid[startNode.row][startNode.col];
  const end = grid[endNode.row][endNode.col];
  start.distance = 0;

  let unvisited = [start];
  let visited = [];

  while (unvisited.length > 0) {
    let currNode = unvisited.shift();
    currNode.visited = true;
    visited.push(currNode);
    if (currNode.row === end.row && currNode.col === end.col) break;
    for (let node of findNeighbors(grid, currNode.row, currNode.col)) {
      if (node.visited || node.isWall) continue;
      let currDistance = currNode.distance + 1;
      if (currDistance < node.distance) {
        node.parent = currNode;
        node.distance = currDistance;
        unvisited.push(node);
      }
    }
  }
  return {
    path: findShortestPath(grid, endNode),
    visited
  };
}
