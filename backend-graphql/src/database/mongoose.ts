import mongoose from "mongoose";
import { DatabaseService } from ".";
export const initDatabase = (dbUrl: string) => {
  mongoose.connect(dbUrl, { useNewUrlParser: true });
};

export default class MongoDatabase implements DatabaseService {
  initConnection(dbUrl: string): void {
    initDatabase(dbUrl);
  }
}
