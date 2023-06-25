import { useState } from 'react';
import { useFetch } from '../hooks/useFetch';
import { GameItem } from '../components/GameItem';
import { Link, useNavigate } from 'react-router-dom';
import { IDataItem } from '../interfaces/IDataItem';

export function Home() {
  const endpoint = 'https://games-test-api-81e9fb0d564a.herokuapp.com/api/data';
  const email = 'meu@email.com.br';

  const [loading, data, error] = useFetch<IDataItem[]>(endpoint, email);
  const [searchContent, setSearchContent] = useState('');
  const navigate = useNavigate();

  if (error) {
    return error;
  }

  if (loading) {
    return 'Loading...';
  }

  function handleChange(e: { target: HTMLInputElement }): void {
    setSearchContent(e.target.value);
  }

  function handleClick(): void {
    navigate(`/games/search/${searchContent}`);
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
              {data?.map((item) => (
                <Link to={item.game_url} key={crypto.randomUUID()}>
                  <GameItem game={item} />
                </Link>
              ))}
            </div>
          </section>
        </main>
      </div>
    </>
  );
}
