import { Button, Spacer } from '@nextui-org/react';
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
      <Button auto shadow onClick={login}>
        LOGIN
      </Button>
      <Spacer />
      <Button auto shadow onClick={logout}>
        LOGOUT
      </Button>
      <Spacer />
      <Button auto shadow onClick={refresh}>
        REFRESH
      </Button>
    </div>
  );
};

export default About;
