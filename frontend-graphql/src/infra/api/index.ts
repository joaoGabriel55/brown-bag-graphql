import { ApolloClient, InMemoryCache } from "@apollo/client";

export const api = new ApolloClient({
  uri: "http://localhost:3000/graphql",
  cache: new InMemoryCache(),
});
