import { useEffect, useState } from "react";

export function useFetch(endpoint: string, email: string): (boolean | string | null )[] {
  const [loading, setLoading] = useState(true);
  const [response, setResponse] = useState(null);

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