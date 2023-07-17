import { GameItem } from '../components/GameItem'
import { useFetch } from '../hooks/useFetch'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import styles from './_gamelist.module.scss'
import { Loading } from '../components/Loading'
import { Header } from '../components/Header'
import { useAppContext } from '../hooks/useAppContext'
import { getUserData } from '../services/database'
import { IUserData } from '../interfaces/IUserData'

export function GameList() {
  const endpoint = 'https://games-test-api-81e9fb0d564a.herokuapp.com/api/data'
  const email = 'meu@email.com.br'

  const [loading, data, error] = useFetch(endpoint, email)
  const [filterByGenre, setFilterByGenre] = useState('')
  const { str } = useParams()

  const { setUserData } = useAppContext()

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-extra-semi
    ;(async () => {
      const data = await getUserData()
      if (data) {
        setUserData(data as IUserData)
      }
    })()
  }, [setUserData])

  if (error) {
    return (
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          fontSize: '1.5rem',
          maxWidth: '42ch',
          fontWeight: 900,
        }}
      >
        {error}
      </div>
    )
  }

  if (loading) {
    return (
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      >
        <Loading />
      </div>
    )
  }

  const filteredGames = data.filter((el) =>
    el.title.toLowerCase().includes(str?.toLowerCase() as string),
  )

  const genres = Array.from(new Set(filteredGames.map((item) => item.genre)))

  function handleChange(e: { target: HTMLSelectElement }): void {
    if (e.target.value === 'All') {
      setFilterByGenre('')
    } else {
      setFilterByGenre(e.target.value)
    }
  }

  return (
    <>
      <div>
        <Header />
        <main className={styles.main}>
          <section>
            <h1 className={styles.searchtext}>
              Showing results for: <span>{str}</span>
            </h1>
            <div className={styles.genre__container}>
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

          <section className={styles.gamelist__container}>
            <div className={styles.gamelist}>
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
  )
}
