import { createContext, useMemo, useState } from 'react';
import { IDataItem } from '../interfaces/IDataItem';
import { IChildrenProp } from '../interfaces/IChildrenProp';
import { IContextProp } from '../interfaces/IContextProp';

export const AppContext = createContext<IContextProp>({} as IContextProp);

export function AppProvider({ children }: IChildrenProp) {
  const [data, setData] = useState<IDataItem[]>([]);
  const [response, setResponse] = useState<IDataItem[]>([]);

  const values = useMemo(
    () => ({
      data,
      setData,
      response,
      setResponse,
    }),
    [data, response]
  );

  return <AppContext.Provider value={values}>{children}</AppContext.Provider>;
}
