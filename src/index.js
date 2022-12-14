import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { UseContex } from "./context/count";
import { AuthContex } from "./context/AuthContex";

const client = new ApolloClient({
  uri: "http://localhost:4004/graphql",
  cache: new InMemoryCache(),
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <BrowserRouter>
        <UseContex>
          <AuthContex>
            <App />
          </AuthContex>
        </UseContex>
      </BrowserRouter>
    </ApolloProvider>
  </React.StrictMode>
);
