import { Board } from "./board";
import { Player } from "./player";
import { Coordinate } from "./coordinate";
import { GameResult } from "./gameResult";

export class Game {
  nextPlayer(currentPlayer: Player): Player {
    return currentPlayer.opponent();
  }

  // Modern EO-friendly API: ask the Board for the status given a next player.
  // This keeps rule logic on the domain object (Board) and makes Game a coordinator.
  statusForBoard(board: Board, player: Player): string {
    return board.statusFor(player);
  }

  // Play a turn: return GameResult when a move is made, or null when no-op
  playTurn(
    board: Board,
    player: Player,
    position: Coordinate,
  ): GameResult | null {
    if (board.isOccupiedAt(position) || board.winner()) {
      return null;
    }

    const newBoard = player.selectSquare(board, position);
    const winner = newBoard.winner();
    const nextPlayer = player.opponent();
    const status = newBoard.statusFor(nextPlayer);

    return new GameResult(newBoard, nextPlayer, winner, status);
  }
}
