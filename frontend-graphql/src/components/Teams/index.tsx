import { useQuery } from "@apollo/client";
import React, { useState } from "react";
import Team from "../../domain/Team";
import { TEAMS } from "../../services";
import PlayersTile from "../PlayersTile";
import TeamTile from "../TeamTile";
import "./index.css";

function Teams() {
  const { loading, error, data } = useQuery(TEAMS);

  const [seePlayers, setSeePlayers] = useState(false);

  if (loading) return <div className="content">Loading...</div>;
  if (error) return <div className="content">Error :(</div>;

  const { findAllTeams: teams } = data;

  return (
    <div className="content">
      <div className="team-list">
        <button
          className={`see-team-players-button ${
            seePlayers && "button-enabled"
          }`}
          onClick={() => {
            setSeePlayers(!seePlayers);
          }}
        >
          {seePlayers ? "See just teams" : "See team players"}
        </button>
        {teams.map((team: Team) =>
          !seePlayers ? (
            <TeamTile key={team.id} team={team} />
          ) : team.players && team.players.length ? (
            <PlayersTile team={team.logoUrl} players={team.players} />
          ) : (
            <TeamTile key={team.id} team={team} />
          )
        )}
      </div>
      <div className="add-team-button">
        <button title="Create Team">
          <span>+</span>
        </button>
      </div>
    </div>
  );
}

export default Teams;
