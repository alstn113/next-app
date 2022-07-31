import counterAtom from '@/libs/store/counter';
import { Button, Text } from '@nextui-org/react';
import { NextPage } from 'next';
import { useRecoilState } from 'recoil';

const Counter: NextPage = () => {
  const [state, setState] = useRecoilState(counterAtom);
  return (
    <div>
      <Button shadow auto onClick={() => setState({ count: state.count + 1 })}>
        플러스
      </Button>

      <Text>{state.count}</Text>

      <Button shadow auto onClick={() => setState({ count: state.count - 1 })}>
        마이너스
      </Button>
    </div>
  );
};

export default Counter;
