import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import ApolloClient from 'apollo-client';
import { ApolloProvider } from '@apollo/react-hooks';
import { HttpLink } from "apollo-link-http";
import * as serviceWorker from './serviceWorker';
import { InMemoryCache } from "apollo-cache-inmemory";

const link = new HttpLink({
  uri: "http://localhost:4000/"
})

const cache = new InMemoryCache();

const client = new ApolloClient({
    cache: cache,
    link: link
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
);

serviceWorker.unregister();
