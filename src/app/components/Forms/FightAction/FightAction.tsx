import FightButton from '../../Buttons/FightButton/FightButton';
import { ActionProps } from '../MoveAction/types';

const FightAction = ({ setError, setCooldown, setMessages }: ActionProps) => {
  return (
    <form action='fightMonster'>
      <FightButton
        setError={setError}
        setMessages={setMessages}
        setCooldown={setCooldown}
      />
    </form>
  );
};

export default FightAction;
