import { ApolloClient, HttpLink, InMemoryCache, split } from "@apollo/client";
import { WebSocketLink } from "@apollo/client/link/ws";
import { getMainDefinition } from "@apollo/client/utilities";

const httpLink = new HttpLink({
  uri: process.env.REACT_APP_BACKEND_API,
});

const webSocketLink = new WebSocketLink({
  uri: `${process.env.REACT_APP_BACKEND_WEB_SOCKET}`,
  options: {
    reconnect: true,
  },
});

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  webSocketLink,
  httpLink
);

export const api = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
});
