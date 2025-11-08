import { Board } from "./board";
import { Player } from "./player";
import { Coordinate } from "./coordinate";
import { GameResult } from "./gameResult";
import { GameStatus } from "./gameStatus";

export class Game {
  nextPlayer(currentPlayer: Player): Player {
    return currentPlayer.opponent();
  }

  // Modern EO-friendly API: ask the Board for the status given a next player.
  // This keeps rule logic on the domain object (Board) and makes Game a coordinator.
  statusForBoard(board: Board, player: Player): string {
    return board.statusFor(player);
  }

  // Play a turn: always return a GameResult with a `changed` flag indicating whether the board was updated.
  playTurn(board: Board, player: Player, position: Coordinate): GameResult {
    const currentWinner = board.winner();

    // No-op: if position is occupied or there's already a winner, return unchanged result
    if (board.isOccupiedAt(position) || currentWinner) {
      const status = GameStatus.fromBoard(board);
      return new GameResult(board, player, currentWinner, status, false);
    }

    // Apply move
    const newBoard = player.selectSquare(board, position);
    const winner = newBoard.winner();
    const nextPlayer = player.opponent();
    const status = GameStatus.fromBoard(newBoard);

    return new GameResult(newBoard, nextPlayer, winner, status, true);
  }
}
