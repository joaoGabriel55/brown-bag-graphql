import React from "react";
import Team from "../../domain/Team";
import "./index.css";

interface TeamProps {
  team: Team;
}

function TeamTile({ team }: TeamProps) {
  const { name, logoUrl, foundation } = team;
  return (
    <div className="team-tile">
      <img width="50" height="50" src={logoUrl} alt={name} loading="lazy" />
      <div>{name}</div>
      <div>{foundation}</div>
    </div>
  );
}

export default TeamTile;
