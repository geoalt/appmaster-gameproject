import { GameItem } from '../components/GameItem';
import { useFetch } from '../hooks/useFetch';
import { useParams } from 'react-router-dom';
import { IDataItem } from '../interfaces/IDataItem';
import { useState } from 'react';

export function GameList() {
  const endpoint = 'https://games-test-api-81e9fb0d564a.herokuapp.com/api/data';
  const email = 'meu@email.com.br';

  const [loading, data, error] = useFetch<IDataItem[]>(endpoint, email);
  const [filterByGenre, setFilterByGenre] = useState('');
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

  const genres = Array.from(new Set(filteredGames.map((item) => item.genre)));

  function handleChange(e: { target: HTMLSelectElement }): void {
    if (e.target.value === 'All') {
      setFilterByGenre('');
    } else {
      setFilterByGenre(e.target.value);
    }
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
              <label htmlFor="selectGenre">
                Filter by genre
                <select
                  name="selectGenre"
                  id="selectGenre"
                  value={filterByGenre}
                  onChange={(e) => handleChange(e)}
                >
                  <option value="All">All</option>
                  {genres.map((genre) => (
                    <option key={crypto.randomUUID()} value={genre}>
                      {genre}
                    </option>
                  ))}
                </select>
              </label>
            </div>
          </section>

          <section>
            <div>
              {filteredGames
                .filter(({ genre }) => genre.includes(filterByGenre))
                .map((item) => (
                  <GameItem game={item} key={crypto.randomUUID()} />
                ))}
            </div>
          </section>
        </main>
      </div>
    </>
  );
}
