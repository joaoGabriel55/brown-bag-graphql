import React, { BaseSyntheticEvent } from "react";
import { useHistory } from "react-router";
import "./index.css";

function NewTeam() {
  const history = useHistory();

  const saveTeam = (e: BaseSyntheticEvent) => {
    e.preventDefault();
    history.goBack();
  };

  const cancelOperation = (e: BaseSyntheticEvent): void => {
    e.preventDefault();
    history.goBack();
  };

  return (
    <div className="container">
      <form className="form-content">
        <h2>New Team</h2>
        <input type="text" name="name" id="name" placeholder="Team name" />
        <input
          id="foundation"
          type="text"
          name="foundation"
          placeholder="Foundation"
        />
        <input type="text" name="logoUrl" id="logoUrl" placeholder="Logo URL" />

        <h3>Players</h3>

        <div className="player-form">
          <input type="text" name="name" id="name" placeholder="Player name" />
          <input id="age" type="text" name="age" placeholder="Age" />
          <input
            type="text"
            name="photoUrl"
            id="photoUrl"
            placeholder="Photo URL"
          />
        </div>

        <button onClick={(e) => saveTeam(e)}>Add Player</button>

        <button onClick={(e) => saveTeam(e)}>Create</button>
        <button onClick={(e) => cancelOperation(e)}>Cancel</button>
      </form>
    </div>
  );
}

export default NewTeam;
