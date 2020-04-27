export const findNeighbors = (board, row, col) => {
  let neighbors = [];

  //returns valid values to traverse to
  const findValues = (row, col) => {
    if(row < 0 || row >= board.length || col < 0 || col >= board[0].length) {
      return undefined;
    } else {
      return board[row][col];
    }
  }

  neighbors.push(findValues(row + 1, col));
  neighbors.push(findValues(row - 1, col));
  neighbors.push(findValues(row, col + 1));
  neighbors.push(findValues(row, col - 1));

  return neighbors.filter(val => val !== undefined);
}

//find shortest path to endNode
export const findShortestPath = (board, endNode) => {
  let currPath = [];
  let currNode = board[endNode.row][endNode.col];

  while (currNode.parent !== undefined) {
    currPath.unshift(currNode.parent);
    currNode = currNode.parent;
  }

  currPath.push(board[endNode.row][endNode.col]);
  return currPath;
}


