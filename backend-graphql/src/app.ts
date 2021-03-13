import { ApolloServer } from "apollo-server-express";
import compression from "compression";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import depthLimit from "graphql-depth-limit";
import http from "http";
import { Database } from "./database";
import MongoDatabase from "./database/mongoose";
import schema from "./schema";

dotenv.config();

const mongoDatabase = new MongoDatabase();
const database = new Database(mongoDatabase);
database.initConnection(process.env.DATABASE_URL);

const app = express();
app.use(cors());
app.use(compression());

const server = new ApolloServer({
  schema,
  validationRules: [depthLimit(7)],
  subscriptions: {
    path: "/subscriptions",
    onConnect: (connectionParams, webSocket, context) => {
      console.log("Client connected");
    },
    onDisconnect: (webSocket, context) => {
      console.log("Client disconnected");
    },
  },
});

server.applyMiddleware({ app });

const httpServer = http.createServer(app);
server.installSubscriptionHandlers(httpServer);

export { httpServer, server };
