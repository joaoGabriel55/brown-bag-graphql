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
