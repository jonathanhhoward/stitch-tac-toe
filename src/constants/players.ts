import liloImage from "../images/lilo.png";
import stitchImage from "../images/stitch.png";
import { Player } from "../models/player";

export const lilo = new Player("Lilo", liloImage);
export const stitch = new Player("Stitch", stitchImage);
export const tie = new Player("Tie", "");

// Wire opponents so Player.opponent() is available
lilo.setOpponent(stitch);
stitch.setOpponent(lilo);
// tie has no opponent
