import { createContext, useContext } from 'react';
import { toast } from '../hooks/use-toast';

const MessageContext = createContext();

export function MessageProvider({ children }) {
  // showMessage now uses shadcn/ui toast
  const showMessage = (text, type = 'success') => {
    toast({
      title: text,
      variant: type === 'error' ? 'destructive' : 'default',
    });
  };

  return (
    <MessageContext.Provider value={{ showMessage }}>
      {children}
    </MessageContext.Provider>
  );
}

export const useMessage = () => useContext(MessageContext);