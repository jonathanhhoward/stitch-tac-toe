import { tie } from "../constants/players";
import { Board } from "./board";
import { Player } from "./player";
import { Coordinate } from "./coordinate";
import { GameResult } from "./gameResult";

export class Game {
  nextPlayer(currentPlayer: Player): Player {
    return currentPlayer.opponent();
  }

  // Legacy API: builds a status string from a player and optional winner.
  // Kept for backward compatibility; prefer `statusForBoard` below.
  status(player: Player, winner: Player | null): string {
    return winner
      ? winner === tie
        ? "Tie!"
        : `${winner.name} wins!`
      : `${player.name}'s turn`;
  }

  // Modern EO-friendly API: ask the Board for the status given a next player.
  // This keeps rule logic on the domain object (Board) and makes Game a coordinator.
  statusForBoard(board: Board, player: Player): string {
    return board.statusFor(player);
  }

  checkForWinner(board: Board): Player | null {
    return board.winner();
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
