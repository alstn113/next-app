import counterAtom from '@/libs/store/counter';
import { useRecoilState } from 'recoil';

const Counter = () => {
  const [state, setState] = useRecoilState(counterAtom);
  return (
    <div>
      <div>
        <button onClick={() => setState({ count: state.count + 1 })}>
          플러스
        </button>
      </div>
      <div>{state.count}</div>
      <div>
        <button onClick={() => setState({ count: state.count - 1 })}>
          마이너스
        </button>
      </div>
    </div>
  );
};

export default Counter;
