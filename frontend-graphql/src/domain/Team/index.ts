import Player from "../Player";

export default interface Team {
  id: string;
  name: string;
  foundation: number;
  logoUrl: string;
  players: Player[]
}
