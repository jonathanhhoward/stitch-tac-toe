import liloImage from "../images/lilo.png";
import stitchImage from "../images/stitch.png";
import { Player } from "../models/player";

export const lilo: Player = new Player("Lilo", liloImage, () => stitch);
export const stitch: Player = new Player("Stitch", stitchImage, () => lilo);
export const tie = new Player("Tie", "");
