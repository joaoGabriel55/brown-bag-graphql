import { useQuery } from "@apollo/client";
import React from "react";
import { TEAMS } from "../../services";
import "./index.css";

interface Team {
  id: string;
  name: string;
  foundation: number;
}

function Teams() {
  const { loading, error, data } = useQuery(TEAMS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  const { findAllTeams: teams } = data;

  return (
    <div className="content">
      <div className="team-list">
        {teams.map((team: Team) => (
          <>
            <div>{team.name}</div>
            <div>{team.foundation}</div>
          </>
        ))}
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
