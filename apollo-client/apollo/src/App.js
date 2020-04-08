import React from 'react';
import './App.css';
//import ApolloClient from 'apollo-boost';
//import { gql } from 'apollo-boost';
//import { ApolloProvider } from '@apollo/react-hooks';
//import { useQuery } from '@apollo/react-hooks';
//import { HttpLink } from "apollo-link-http";
//import { InMemoryCache } from "apollo-cache-inmemory";
import Missions from "./missionQ"

//const cache = new InMemoryCache();
// const link = new HttpLink({
//   uri: "http://localhost:4000/"
// })

// const c = new ApolloClient({
//     link
// });


function App() {
  return (
    <div className="App">
      <h1>Missions</h1>
      <Missions />
    </div>
    
  );

}

export default App;
