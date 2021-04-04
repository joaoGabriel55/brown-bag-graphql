import React from "react";
import Player from "../../domain/Player";
import "./index.css";

interface PlayerProps {
  team: string;
  players: Player[];
}
function PlayersTile({ team, players }: PlayerProps) {
  return (
    <div className="players-tile">
      <img width="50" height="50" src={team} alt={team} />
      {players.map(({ name, photoUrl, position, age }) => (
        <div className="player-tile">
          <img
            width="50"
            height="50"
            src={photoUrl}
            alt={name}
            loading="lazy"
          />
          <div className="player-tile-info">
            <div>
              <strong>{name}</strong>
            </div>
            <div>{age}</div>
            <div>{position}</div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default PlayersTile;
