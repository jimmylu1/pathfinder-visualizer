import { dijkstra } from "../algorithms/dijkstra";
import { DFS } from "../algorithms/dfs";
import { BFS } from "../algorithms/bfs";

export const ALGORITHMS = {
  dij: dijkstra,
  dfs: DFS,
  bfs: BFS
};

//define initial state of board
export const INITIALSTATE = {
  width: 16,
  height: 30,
  board: [],
  moveStart: false,
  moveEnd: false,
  drawWall: false,
  startNode: { row: 0, col: 0 },
  endNode: { row: 6, col: 10 }
};
