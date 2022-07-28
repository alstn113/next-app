import axios from 'axios';
import { NextPage } from 'next';

const About: NextPage = () => {
  const login = async () => {
    await axios.get('/api/auth/login');
  };
  const logout = async () => {
    await axios.delete('/api/auth/logout');
  };
  return (
    <div>
      <button onClick={login}>로그인</button>
      <button onClick={logout}>로그아웃</button>
    </div>
  );
};

export default About;
