import dotenv from "dotenv";
import { httpServer, server } from "./app";
dotenv.config();
const PORT_NUMBER = process.env.PORT;

httpServer.listen({ port: PORT_NUMBER }, (): void => {
  console.log(
    `🚀 Server ready at http://localhost:${PORT_NUMBER}${server.graphqlPath}`
  );
  console.log(
    `🚀 Subscriptions ready at ws://localhost:${PORT_NUMBER}${server.subscriptionsPath}`
  );
});
