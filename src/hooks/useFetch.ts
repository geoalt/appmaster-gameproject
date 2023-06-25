import { useCallback, useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppProvider";
import { IDataItem } from "../interfaces/IDataItem";

export function useFetch(endpoint: string, email: string): [boolean, IDataItem[], IDataItem[]]{

  const [loading, setLoading] = useState(true);
  const { data, setData, response, setResponse } = useContext(AppContext);

  const updateData = useCallback((json: IDataItem[]) => {
    setResponse(json);
    setData(json);
}, [setData, setResponse]);


  useEffect(() => {
    (async () => {
        const resp = await fetch(endpoint, {
          headers: {
            'Content-Type': 'application/json',
            'dev-email-address': email
          }
        });
        const json = await resp.json();
        
        setLoading(false);
        updateData(json)
      }
      
      )();
    }, [endpoint, email, updateData]);
    
    return [loading, response, data]
}