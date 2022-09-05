import ReactDOM from 'react-dom';

interface Props {
  children: React.ReactNode;
  id: string;
}

const Portal = ({ children, id }: Props) => {
  const element =
    typeof window !== 'undefined' &&
    (document.getElementById(id) as HTMLElement);
  return element ? ReactDOM.createPortal(children, element) : null;
};

export default Portal;
