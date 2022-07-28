import axios from 'axios';
import { NextPage } from 'next';

const About: NextPage = () => {
  const login = async () => {
    await axios.post('/api/auth/login');
  };
  const logout = async () => {
    await axios.delete('/api/auth/logout');
  };
  const refresh = async () => {
    await axios.post('/api/auth/refresh');
  };
  return (
    <div>
      <button onClick={login}>LOGIN</button>
      <button onClick={logout}>LOGOUT</button>
      <button onClick={refresh}>REFRESH</button>
    </div>
  );
};

export default About;
