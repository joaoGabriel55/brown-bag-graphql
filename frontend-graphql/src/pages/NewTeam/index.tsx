import { useMutation } from "@apollo/client";
import React, { BaseSyntheticEvent, useEffect, useState } from "react";
import { useHistory } from "react-router";
import { STORE_TEAM, STORE_TEAM_PLAYERS } from "../../services";
import "./index.css";

interface Team {
  name: string | undefined;
  foundation: number | undefined;
  logoUrl: string | undefined;
  players: Player[];
}

interface Player {
  name: string | undefined;
  age: number | undefined;
  photoUrl: string | undefined;
  position: string | undefined;
}

const initialPlayerState = {
  name: undefined,
  age: undefined,
  photoUrl: undefined,
  position: undefined,
};

function NewTeam() {
  const history = useHistory();

  const [storeTeam] = useMutation(STORE_TEAM);
  const [storeTeamPlayers] = useMutation(STORE_TEAM_PLAYERS);

  const [team, setTeam] = useState<Team>({
    name: undefined,
    foundation: undefined,
    logoUrl: undefined,
    players: [],
  });

  const [player, setPlayer] = useState<Player>(initialPlayerState);

  const [players, setPlayers] = useState<Player[]>([]);

  const [validTeam, setValidTeam] = useState(false);
  const [validPlayer, setValidPlayer] = useState(false);

  useEffect(() => {
    const { name: teamName, foundation, logoUrl } = team;
    const { name: playerName, age, photoUrl, position } = player;

    if (teamName && foundation && logoUrl && players.length > 0)
      setValidTeam(true);
    else setValidTeam(false);

    if (playerName && age && photoUrl && position) setValidPlayer(true);
    else setValidPlayer(false);
  }, [team, player, players]);

  const clearInputs = (elementId: string) => {
    document
      .getElementById(elementId)
      ?.querySelectorAll("input")
      .forEach((node) => {
        node.value = "";
      });
  };

  const addPlayer = (e: BaseSyntheticEvent) => {
    e.preventDefault();
    setPlayers([...players, player]);
    setPlayer({ ...initialPlayerState });
    clearInputs("player-form");
  };

  const removePlayer = (index: number) => {
    const newPlayers = players.filter(
      (_, currentIndex) => players.indexOf(players[index]) !== currentIndex
    );
    setPlayers([...newPlayers]);
  };

  const saveTeam = (e: BaseSyntheticEvent) => {
    e.preventDefault();
    const { name, foundation, logoUrl } = team;

    storeTeam({
      variables: { name, foundation, logoUrl },
    })
      .then(({ data }) => {
        const { storeTeam } = data;
        return storeTeamPlayers({
          variables: { teamId: storeTeam.id, players },
        });
      })
      .finally(() => history.goBack());
  };

  const cancelOperation = (e: BaseSyntheticEvent): void => {
    e.preventDefault();
    history.goBack();
  };

  return (
    <div className="container">
      <form className="form-content">
        <h2>New Team</h2>
        <input
          id="name"
          type="text"
          name="name"
          value={team?.name}
          placeholder="Team name"
          onChange={(e) => {
            setTeam({ ...team, name: e.target.value });
          }}
        />
        <input
          id="foundation"
          type="number"
          min="1800"
          name="foundation"
          value={team?.foundation}
          placeholder="Foundation"
          onChange={(e) => {
            setTeam({ ...team, foundation: Number.parseInt(e.target.value) });
          }}
        />
        <input
          id="logoUrl"
          type="text"
          name="logoUrl"
          value={team?.logoUrl}
          placeholder="Logo URL"
          onChange={(e) => {
            setTeam({ ...team, logoUrl: e.target.value });
          }}
        />

        <h3>Players</h3>

        <div id="player-form" className="player-form">
          <input
            id="photoUrl"
            type="text"
            name="photoUrl"
            value={player?.photoUrl}
            placeholder="Photo URL"
            onChange={(e) => {
              setPlayer({ ...player, photoUrl: e.target.value });
            }}
          />
          <input
            type="text"
            name="name"
            id="name"
            value={player?.name}
            placeholder="Player name"
            onChange={(e) => {
              setPlayer({ ...player, name: e.target.value });
            }}
          />
          <input
            id="age"
            type="number"
            min="15"
            name="age"
            value={player?.age}
            placeholder="Age"
            onChange={(e) => {
              setPlayer({ ...player, age: Number.parseInt(e.target.value) });
            }}
          />
          <input
            id="position"
            type="text"
            name="position"
            value={player?.position}
            placeholder="Position"
            onChange={(e) => {
              setPlayer({ ...player, position: e.target.value });
            }}
          />
          {players.length > 0 &&
            players.map((player, index) => (
              <div className="player-simple-tile" key={player.photoUrl}>
                <img
                  src={player.photoUrl}
                  width="50"
                  height="50"
                  alt={player.name}
                />
                <p>
                  <strong>{player.name}</strong>
                </p>
                <p>Age: {player.age}</p>
                <p>Position: {player.position}</p>
                <button
                  className="default-button danger"
                  onClick={() => {
                    removePlayer(index);
                  }}
                >
                  Remove player
                </button>
              </div>
            ))}
          <button
            disabled={!validPlayer}
            className="default-button"
            onClick={addPlayer}
          >
            Add Player
          </button>
        </div>
        <br />
        <div className="button-group">
          <button
            disabled={!validTeam}
            className={`default-button ${validTeam && "primary"}`}
            onClick={(e) => saveTeam(e)}
          >
            Create
          </button>
          <button
            className="default-button danger"
            onClick={(e) => cancelOperation(e)}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default NewTeam;
