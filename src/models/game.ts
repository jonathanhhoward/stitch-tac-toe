import { Board } from "./board";
import { Coordinate } from "./coordinate";
import { GameResult } from "./gameResult";
import { GameStatus } from "./gameStatus";
import { Player } from "./player";

export class Game {
  nextPlayer(currentPlayer: Player): Player {
    return currentPlayer.opponent();
  }

  playTurn(board: Board, player: Player, position: Coordinate): GameResult {
    const currentWinner = board.winner();

    if (board.isOccupiedAt(position) || currentWinner) {
      const status = GameStatus.fromBoard(board);
      return new GameResult(board, player, currentWinner, status, false);
    }

    const newBoard = player.selectSquare(board, position);

    return new GameResult(
      newBoard,
      player.opponent(),
      newBoard.winner(),
      GameStatus.fromBoard(newBoard),
      true,
    );
  }
}
