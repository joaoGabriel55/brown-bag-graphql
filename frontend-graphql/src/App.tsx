import { ApolloProvider } from "@apollo/client";
import React from "react";
import "./App.css";
import { api as client } from "./infra/api";
import Router from "./router";

function App() {
  return (
    <ApolloProvider client={client}>
      <header className="app-header">
        <h1>World Teams</h1>
      </header>
      <div className="app">
        <Router />
      </div>
      <div className="app-footer">
        <span>Made with ❤️ by Gabriel Quaresma</span>
      </div>
    </ApolloProvider>
  );
}

export default App;
