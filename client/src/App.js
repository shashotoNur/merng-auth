  
import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { ApolloProvider } from '@apollo/react-hooks';
import { Switch, Route } from 'react-router-dom';

import SignUp from "./components/auth/SignUp";
import Index from "./components/";

const httpLink = createHttpLink(
  {
    uri: 'http://localhost:5000/graphql',
    credentials: 'include',
    onError: ({ networkError, graphQLErrors }) => {
      console.log('graphQLErrors:', graphQLErrors)
      console.log('networkError:', networkError)
    }
  });

const authLink = setContext((_, { headers }) =>
  {
    const token = localStorage.getItem('token');
    const authLink = { headers: { ...headers, token } };

    return authLink
  });

const client = new ApolloClient(
  {
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
  });


const App = () =>
  {
    return (
      <ApolloProvider client={ client } className="App">
        <Switch>
          <Route exact path="/" component={ Index } />
          <Route exact path="/signup" component={ SignUp } />
        </Switch>
      </ApolloProvider>
    );
  };

export default App;