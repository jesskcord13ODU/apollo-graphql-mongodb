import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import ApolloClient from 'apollo-client';
import { ApolloProvider } from '@apollo/react-hooks';
import { HttpLink } from "apollo-link-http";
import * as serviceWorker from './serviceWorker';
import { InMemoryCache } from "apollo-cache-inmemory";

//import { useQuery } from '@apollo/react-hooks';
//import { gql } from 'apollo-boost';

const link = new HttpLink({
  uri: "http://localhost:4000/"
})

const cache = new InMemoryCache();

const client = new ApolloClient({
    cache: cache,
    link: link
});

// ReactDOM.render(
//   <App />,
//   document.getElementById('root')
// )

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
