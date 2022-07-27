import counterAtom from '@/libs/store/counter';
import { Button, Text } from '@nextui-org/react';
import { useRecoilState } from 'recoil';

const Counter = () => {
  const [state, setState] = useRecoilState(counterAtom);
  return (
    <div>
      <Button onClick={() => setState({ count: state.count + 1 })}>
        플러스
      </Button>

      <Text>{state.count}</Text>

      <Button onClick={() => setState({ count: state.count - 1 })}>
        마이너스
      </Button>
    </div>
  );
};

export default Counter;
