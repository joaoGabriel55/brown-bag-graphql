import { ApolloProvider } from "@apollo/client";
import React from "react";
import "./App.css";
import Teams from "./components/Teams";
import { api as client } from "./infra/api";

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="app">
        <header className="app-header">
          <h1>World Teams</h1>
        </header>
        <Teams />
        <div className="app-footer">
          <span>Made with love by Gabriel Quaresma</span>
        </div>
      </div>
    </ApolloProvider>
  );
}

export default App;
