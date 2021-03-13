import { PubSub } from "graphql-subscriptions";
import Player from "../models/Player";
import { index, store, storeTeamPlayers } from "../services/TeamService";

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
      const players: [] = await Player.find({ team: teamId });
      return players;
    },
  },
  Mutation: {
    async storeTeam(_: void, { name, foundation }) {
      pubsub.publish(TOPICS.TEAM_ADD, { teamAdded: { name, foundation } });
      const newTeam = await store({ name, foundation });
      return newTeam;
    },
    async storeTeamPlayers(_: void, { teamId, players }) {
      const teamPlayers = storeTeamPlayers({ teamId, players });
      return teamPlayers;
    },
  },
  Subscription: {
    teamAdded: {
      resolve: (payload: any) => {
        console.log(payload);
        return {
          customData: payload,
        };
      },
      subscribe: () => pubsub.asyncIterator([TOPICS.TEAM_ADD]),
    },
  },
};
