import RestButton from '../../Buttons/RestButton/RestButton';
import { ActionProps } from '../MoveAction/types';

const RestAction = ({ setError, setMessages, setCooldown }: ActionProps) => {
  return (
    <form>
      <RestButton
        setError={setError}
        setMessages={setMessages}
        setCooldown={setCooldown}
      />
    </form>
  );
};

export default RestAction;
