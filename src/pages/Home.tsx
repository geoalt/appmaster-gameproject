import { useState } from 'react';
import { useFetch } from '../hooks/useFetch';
import { GameItem } from '../components/GameItem';

export function Home() {
  const endpoint = 'https://games-test-api-81e9fb0d564a.herokuapp.com/api/data';
  const email = 'meu@email.com.br';

  const [loading, response, data] = useFetch(endpoint, email);

  const [searchContent, setSearchContent] = useState('');

  if (loading) {
    return 'Carregando...';
  }

  function handleChange(e: { target: HTMLInputElement }): void {
    setSearchContent(e.target.value);
  }

  function handleClick() {
    const filteredGames = response.filter((game) =>
      game.title.toLowerCase().includes(searchContent.toLowerCase())
    );

    console.log(filteredGames);
  }

  return (
    <>
      <div>
        <main>
          <section>
            <div>
              <h1>Find your new free to play game!</h1>
              <input
                type="search"
                name="inputSearch"
                id="inputSearch"
                value={searchContent}
                onChange={(e) => handleChange(e)}
              />
              <input type="button" value="Search" onClick={handleClick} />
            </div>
          </section>

          <section>
            <div>
              {data.map((item) => (
                <GameItem game={item} key={crypto.randomUUID()} />
              ))}
            </div>
          </section>
        </main>
      </div>
    </>
  );
}
