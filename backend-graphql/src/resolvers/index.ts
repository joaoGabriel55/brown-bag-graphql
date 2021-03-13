import { IResolvers } from "graphql-tools";
import teamResolvers from "./teamResolvers";

const resolvers: IResolvers = {
  ...teamResolvers,
};
export default resolvers;
