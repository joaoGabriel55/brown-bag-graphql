import { gql } from "@apollo/client";

export const TEAMS = gql`
  query {
    findAllTeams {
      id
      name
      foundation
      logoUrl
      players {
        name
        age
        photoUrl
        position
      }
    }
  }
`;

export const STORE_TEAM = gql`
  mutation StoreTeam($name: String!, $foundation: Int!, $logoUrl: String!) {
    storeTeam(name: $name, foundation: $foundation, logoUrl: $logoUrl) {
      id
    }
  }
`;

export const STORE_TEAM_PLAYERS = gql`
  mutation StoreTeamPlayers($teamId: String!, $players: [PlayerInput!]!) {
    storeTeamPlayers(teamId: $teamId, players: $players) {
      name
      team {
        name
      }
    }
  }
`;

export const REMOVE_TEAM = gql`
  mutation RemoveTeam($teamId: String!) {
    removeTeam(teamId: $teamId) {
      id
    }
  }
`;

export const TEAM_ADDED_SUBSCRIPTION = gql`
  subscription TeamAdded {
    teamAdded {
      id
      name
      foundation
      logoUrl
    }
  }
`;
