import { useContext } from 'react';
import { AppContext } from '../context/AppProvider';

export function useAppContext() {
  const context = useContext(AppContext);

  return context;
}
