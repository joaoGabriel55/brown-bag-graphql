import { PubSub } from "graphql-subscriptions";
import {
  index,
  indexTeamPlayers,
  removeTeam,
  store,
  storeTeamPlayers,
} from "../services/TeamService";

const pubsub = new PubSub();
const TOPICS = {
  TEAM_ADD: "teamAdded",
};

export default {
  Query: {
    async findAllTeams(_: void, args: void) {
      const teams: any[] = await index();
      return teams;
    },
    async findTeamPlayers(_: void, { teamId }) {
      const players: any[] = await indexTeamPlayers(teamId);
      return players;
    },
  },
  Mutation: {
    async storeTeam(_: void, { name, foundation, logoUrl }) {
      const newTeam = await store({ name, foundation, logoUrl });
      pubsub.publish(TOPICS.TEAM_ADD, {
        teamAdded: { id: newTeam.id, name, foundation, logoUrl },
      });
      return newTeam;
    },
    async storeTeamPlayers(_: void, { teamId, players }) {
      const teamPlayers = storeTeamPlayers({ teamId, players });
      return teamPlayers;
    },
    async removeTeam(_: void, { teamId }) {
      const team = removeTeam(teamId);
      return team;
    },
  },
  Subscription: {
    teamAdded: {
      subscribe: () => pubsub.asyncIterator([TOPICS.TEAM_ADD]),
    },
  },
};
