import { ApolloError, useQuery } from "@apollo/client";
import React, { useState } from "react";
import { useHistory } from "react-router";
import PlayersTile from "../../components/PlayersTile";
import TeamTile from "../../components/TeamTile";
import Team from "../../domain/Team";
import { NEW_TEAM } from "../../router/routers";
import { TEAMS } from "../../services";
import "./index.css";

interface PageContentProps {
  loading: boolean;
  error: ApolloError | undefined;
  data: any;
  seePlayers: boolean;
}

function PageContent({ loading, error, data, seePlayers }: PageContentProps) {
  if (loading) return <h2>Loading...</h2>;

  if (error) return <h2>Error to load data 😪</h2>;

  const { findAllTeams: teams } = data;

  return teams.map((team: Team) =>
    !seePlayers ? (
      <TeamTile key={team.id} team={team} />
    ) : team.players && team.players.length ? (
      <PlayersTile team={team.logoUrl} players={team.players} />
    ) : (
      <TeamTile key={team.id} team={team} />
    )
  );
}

function Teams() {
  const history = useHistory();
  const { loading, error, data } = useQuery(TEAMS);

  const [seePlayers, setSeePlayers] = useState(false);

  return (
    <div className="content">
      <div className="team-list">
        {data && (
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
        )}
        <PageContent
          loading={loading}
          error={error}
          data={data}
          seePlayers={seePlayers}
        />
      </div>
      <div className="add-team-button">
        <button onClick={() => history.push(NEW_TEAM)} title="Create Team">
          <span>+</span>
        </button>
      </div>
    </div>
  );
}

export default Teams;
