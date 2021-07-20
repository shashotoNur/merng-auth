import Login from './auth/Login';
import Profile from './user/Profile';

const Index = () =>
  {
    const token = localStorage.getItem('token');

    if (token && token !== "undefined") return <Profile />;
    return <Login />;
  };

export default Index;