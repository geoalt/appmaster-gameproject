import { useEffect, useState } from "react";

export function useFetch<T>(endpoint: string, email: string, initialState = [] as T): [boolean, T]{

  const [loading, setLoading] = useState(true);
  const [response, setResponse] = useState<T>(initialState);

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
        setResponse(json)
      }
      
      )();
    }, [endpoint, email]);
    
    return [loading, response]
}