import PlayerModel from "../models/Player";
import TeamModel from "../models/Team";

interface Team {
  name: string;
  foundation: number;
  logoUrl: string;
}

interface Player {
  name: string;
  age: number;
  position: string;
  team: any;
}

interface TeamPlayers {
  teamId: string;
  players: Player[];
}

export const index = async (): Promise<any[]> => {
  const teams: any[] = await TeamModel.find({});
  let players = [];
  const teamsWithPlayers: any = [];
  for (const team of teams) {
    const { id, name, foundation, logoUrl } = team;
    players = await Promise.all(
      team.players.map(async (playerId: string) => {
        const player = await PlayerModel.findById(playerId);
        const { id, name, age, position, photoUrl } = player;
        return {
          id,
          name,
          age,
          position,
          photoUrl,
        };
      })
    );
    teamsWithPlayers.push({ id, name, foundation, logoUrl, players });
  }
  return teamsWithPlayers;
};

export const indexTeamPlayers = async (teamId: string): Promise<any[]> => {
  const players: any[] = await PlayerModel.find({ team: teamId });
  return players;
};

export const store = async (team: Team): Promise<any> => {
  const newTeam = await TeamModel.create(team);
  return newTeam;
};

export const storeTeamPlayers = async ({
  teamId,
  players,
}: TeamPlayers): Promise<Player[]> => {
  const team = await TeamModel.findById({ _id: teamId });
  if (!team) return;

  const savedPlayers = [];
  for (let player of players) {
    player.team = team;
    const newPlayer = await PlayerModel.create(player);
    savedPlayers.push(newPlayer);
  }

  await TeamModel.updateOne(
    { _id: teamId },
    {
      players: savedPlayers,
    }
  );
  return players;
};

export const removeTeam = async (teamId: string): Promise<Team> => {
  try {
    const team = await TeamModel.findById({ _id: teamId });
    if (!team) return;

    await TeamModel.deleteOne({ _id: teamId });
    await PlayerModel.deleteMany({ team: teamId });
    return team;
  } catch (error) {
    console.log(error);
    throw Error("Error into remove team");
  }
};
