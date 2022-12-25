export function checkForWinner(board: string[][]) {
  if (isEqual(board[0][0], board[0][1], board[0][2])) {
    // row:0
    return board[0][0];
  } else if (isEqual(board[1][0], board[1][1], board[1][2])) {
    // row:1
    return board[1][0];
  } else if (isEqual(board[2][0], board[2][1], board[2][2])) {
    // row:2
    return board[2][0];
  } else if (isEqual(board[0][0], board[1][0], board[2][0])) {
    // col:0
    return board[0][0];
  } else if (isEqual(board[0][1], board[1][1], board[2][1])) {
    // col:1
    return board[0][1];
  } else if (isEqual(board[0][2], board[1][2], board[2][2])) {
    // col:2
    return board[0][2];
  } else if (isEqual(board[0][0], board[1][1], board[2][2])) {
    // back diagonal
    return board[0][0];
  } else if (isEqual(board[0][2], board[1][1], board[2][0])) {
    // forward diagonal
    return board[0][2];
  } else if (isFull(board)) {
    // full board
    return "Tie";
  }
  return "";
}

function isFull(board: string[][]) {
  return board
    .map((row) => row.map((sqr) => !!sqr).reduce((acc, cur) => acc && cur))
    .reduce((acc, cur) => acc && cur);
}

function isEqual(sq1: string, sq2: string, sq3: string) {
  return !!sq1 && !!sq2 && !!sq3 && sq1 === sq2 && sq1 === sq3;
}
