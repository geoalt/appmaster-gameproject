import { useEffect, useState } from "react";
import { useAppContext } from "./useAppContext";
import { IDataItem } from "../interfaces/IDataItem";

export function useFetch(endpoint: string, email: string): [boolean, IDataItem[], null | string]{

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const {setData, data} = useAppContext();

  useEffect(() => {
    (async () => {

      try {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 5000)
        
        const resp = await fetch(endpoint, {
          signal: controller.signal,
          headers: {
            'Content-Type': 'application/json',
            'dev-email-address': email
          },
        });
        
        const json = await resp.json();
        
        clearTimeout(timeout)
        setLoading(false);
        setData(json)
        
        if(resp.status >= 500 && resp.status<= 509) {
          console.error('Servers failed to respond. Try to reload the page.')
          setError('O servidor falhou em responder, tente recarregar a página')
        }
        
        if(resp.statusText === 'unknown') {
          console.error('Servers are busy, try again later.')
          setError('O servidor não conseguirá responder por agora, tente voltar novamente mais tarde')
        }
      } catch(error) {
        console.error(error)
        setError('O servidor demorou para responder, tente mais tarde')
      }

      })();
      
  }, [endpoint, email, setData]);
  
    return [loading, data, error]
}