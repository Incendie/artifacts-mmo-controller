export interface ActionProps {
  setError: Dispatch<SetStateAction<string>>;
  setCooldown: Dispatch<SetStateAction<string>>;
  setMessages: Dispatch<SetStateAction<string[]>>;
}
