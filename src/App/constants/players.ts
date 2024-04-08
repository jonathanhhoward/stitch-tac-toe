import liloImage from "../images/lilo.png";
import stitchImage from "../images/stitch.png";
import { Player } from "../models/player";

export const lilo = new Player({ name: "Lilo", image: liloImage });
export const stitch = new Player({ name: "Stitch", image: stitchImage });
export const tie = new Player({ name: "Tie", image: "" });
