import { useMutation, useQuery, useSubscription } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import PlayersTile from "../../components/PlayersTile";
import TeamTile from "../../components/TeamTile";
import Team from "../../domain/Team";
import { NEW_TEAM } from "../../router/routers";
import { REMOVE_TEAM, TEAMS, TEAM_ADDED_SUBSCRIPTION } from "../../services";
import "./index.css";

interface PageContentProps {
  teams: Team[];
  setTeams: React.Dispatch<React.SetStateAction<Team[]>>;
  seePlayers: boolean;
}

function PageContent({ teams, setTeams, seePlayers }: PageContentProps) {
  const [removeTeam] = useMutation(REMOVE_TEAM);

  const onRemoveTeam = async (teamId: string) => {
    await removeTeam({ variables: { teamId } });
    const newTeams = teams.filter((team) => team.id !== teamId);
    setTeams([...newTeams]);
  };

  return (
    <div className="team-content">
      {teams.map((team: Team) => (
        <>
          {!seePlayers ? (
            <TeamTile team={team} />
          ) : team.players && team.players.length ? (
            <PlayersTile team={team.logoUrl} players={team.players} />
          ) : (
            <TeamTile team={team} />
          )}
          <button
            className="default-button danger"
            onClick={() => onRemoveTeam(team.id)}
          >
            Remove team
          </button>
        </>
      ))}
    </div>
  );
}

function Teams() {
  const history = useHistory();
  const { loading, error, data, refetch } = useQuery(TEAMS);
  const {
    data: dataSubscription,
    loading: loadingSubscription,
  } = useSubscription(TEAM_ADDED_SUBSCRIPTION);

  const [seePlayers, setSeePlayers] = useState(false);

  const [teams, setTeams] = useState<Team[]>([]);

  useEffect(() => {
    refetch()
      ?.then(() => {
        if (data) {
          const { findAllTeams } = data;
          setTeams(findAllTeams);
        }
      })
      .catch(() => {
        setTeams([]);
      });
  }, [data, teams]);

  useEffect(() => {
    if (!loadingSubscription && dataSubscription) {
      setTeams([...teams, dataSubscription.teamAdded]);
    }
  }, [loadingSubscription, dataSubscription]);

  if (loading) return <h2>Loading...</h2>;

  if (error || teams.length === 0) return <h2>Error to load data 😪</h2>;

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
          teams={teams}
          setTeams={(teams) => {
            setTeams(teams);
          }}
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
