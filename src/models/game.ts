import { lilo, stitch, tie } from "../constants/players";
import { Board } from "./board";
import { Player } from "./player";

export class Game {
  nextPlayer(currentPlayer: Player): Player {
    return currentPlayer === stitch ? lilo : stitch;
  }

  status(player: Player, winner: Player | null): string {
    return winner
      ? winner === tie
        ? "Tie!"
        : `${winner.name} wins!`
      : `${player.name}'s turn`;
  }

  checkForWinner(board: Board): Player | null {
    return board.winner();
  }
}
