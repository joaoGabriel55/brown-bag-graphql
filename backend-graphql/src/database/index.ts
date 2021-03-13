export interface DatabaseService {
  initConnection(dbUrl: string): void;
}

export class Database {
  private connection: DatabaseService;

  constructor(connection: DatabaseService) {
    this.connection = connection;
  }

  setConnection(connection: DatabaseService): void {
    this.connection = connection;
  }

  initConnection(dbUrl: string): void {
    this.connection.initConnection(dbUrl);
  }
}
