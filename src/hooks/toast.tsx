import React, { createContext, useContext, useCallback, useState } from 'react';
import { uuid } from 'uuidv4';

import ToastContainer from '../components/ToastContainer';

export interface IToastMessage {
  id: string;
  title: string;
  description: string;
  style: 'text-info' | 'text-success' | 'text-warning' | 'text-danger';
}

interface IToastContextData {
  addToast(message: Omit<IToastMessage, 'id'>): void;
  removeToast(id: string): void;
}

const ToastContext = createContext<IToastContextData>({} as IToastContextData);

function useToast(): IToastContextData {
  const context = useContext(ToastContext);

  if (!context) throw new Error('useToast must be used within a ToastProvider');

  return context;
}

const ToastProvider: React.FC = ({ children }) => {
  const [messages, setMessages] = useState<IToastMessage[]>([]);

  const addToast = useCallback(
    ({ title, description, style }: Omit<IToastMessage, 'id'>) => {
      const id = uuid();
      const toast = {
        id,
        title,
        description,
        style,
      };

      setMessages([...messages, toast]);
    },
    [messages],
  );

  const removeToast = useCallback((id: string) => {
    setMessages(state => state.filter(message => message.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      <ToastContainer messages={messages} />
    </ToastContext.Provider>
  );
};

export { useToast, ToastProvider };
