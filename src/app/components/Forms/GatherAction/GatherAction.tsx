import GatherButton from '../../Buttons/GatherButton/GatherButton';
import { ActionProps } from '../MoveAction/types';

const GatherAction = ({ setError, setCooldown, setMessages }: ActionProps) => {
  return (
    <form action='gather'>
      <GatherButton
        setError={setError}
        setMessages={setMessages}
        setCooldown={setCooldown}
      />
    </form>
  );
};

export default GatherAction;
