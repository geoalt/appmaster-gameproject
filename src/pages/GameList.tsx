import { GameItem } from '../components/GameItem';
import { useFetch } from '../hooks/useFetch';
import { useParams } from 'react-router-dom';
import { IDataItem } from '../interfaces/IDataItem';

export function GameList() {
  const endpoint = 'https://games-test-api-81e9fb0d564a.herokuapp.com/api/data';
  const email = 'meu@email.com.br';

  const [loading, data, error] = useFetch<IDataItem[]>(endpoint, email);
  const { str } = useParams();

  if (error) {
    return error;
  }

  if (loading) {
    return 'Loading...';
  }

  const filteredGames = data.filter((el) =>
    el.title.toLowerCase().includes(str?.toLowerCase() as string)
  );

  if (filteredGames.length === 1) {
    console.log('Somente um titulo encontrado');
  }

  return (
    <>
      <div>
        <main>
          <section>
            <div>
              <p>
                Showing results for: <span>{str}</span>
              </p>
            </div>
          </section>

          <section>
            <div>
              {filteredGames.map((item) => (
                <GameItem game={item} key={crypto.randomUUID()} />
              ))}
            </div>
          </section>
        </main>
      </div>
    </>
  );
}
