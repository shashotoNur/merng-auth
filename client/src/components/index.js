import Login from './auth/Login';
import Profile from './user/Profile';

const Index = (props) =>
  {
    const token = localStorage.getItem('token');

    if (token !== "undefined") return <Profile props={ props } />;
    return <Login />;
  };

export default Index;