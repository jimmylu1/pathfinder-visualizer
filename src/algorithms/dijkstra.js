import { findNeighbors, findShortestPath } from "./helper";

export function dijkstra(startNode, endNode, grid) {
  let start = grid[startNode.row][startNode.col], end = grid[endNode.row][endNode.col];
  start.distance = 0;

  let unvisited = [start];
  let visited = [];

  while (unvisited.length > 0) {
    let currNode = unvisited.shift();
    currNode.visited = true;
    visited.push(currNode);
    //if reach end node end search
    if (currNode.row === end.row && currNode.col === end.col) break;
    let neighbors = findNeighbors(grid, currNode.row, currNode.col);
    for (const neighbor of neighbors) {
      //if node is visited or a wall, skip iteration to next node
      if (neighbor.visited || neighbor.isWall) continue;
      let currDistance = currNode.distance + 1;
      if (currDistance < neighbor.distance) {
        neighbor.prev = currNode;
        neighbor.distance = currDistance;
        unvisited.push(neighbor);
      }
    }
  }
  let shortestPath = findShortestPath(grid, endNode);
  let res = {
    path: shortestPath,
    visited
  };
  return res;
}
