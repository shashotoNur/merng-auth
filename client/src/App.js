  
import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { ApolloProvider } from '@apollo/react-hooks';
import { Switch, Route } from 'react-router-dom';

import SignUp from "./components/auth/SignUp";
import Login from "./components/auth/Login";
import Profile from "./components/auth/Profile";

const httpLink = createHttpLink(
  {
    uri: '/graphql',
    credentials: 'include'
  });

const token = localStorage.getItem('token');
const authLink = setContext((_, { headers }) =>
  {
    return { headers: { ...headers, token } };
  });

const client = new ApolloClient(
  {
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
  });

const Index = (token) ? <Profile client={ client }/> : <Login />;

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