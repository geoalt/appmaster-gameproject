import { useState } from 'react'
import { useFetch } from '../hooks/useFetch'
import { GameItem } from '../components/GameItem'
import { useNavigate } from 'react-router-dom'
import { IDataItem } from '../interfaces/IDataItem'
import styles from './_home.module.scss'
import { Loading } from '../components/Loading'

export function Home() {
  const endpoint = 'https://games-test-api-81e9fb0d564a.herokuapp.com/api/data'
  const email = 'meu@email.com.br'

  const [loading, data, error] = useFetch<IDataItem[]>(endpoint, email)
  const [searchContent, setSearchContent] = useState('')
  const navigate = useNavigate()

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

  function handleChange(e: { target: HTMLInputElement }): void {
    setSearchContent(e.target.value)
  }

  function handleClick(): void {
    navigate(`/games/search/${searchContent}`)
  }

  return (
    <>
      <div>
        <main className={styles.home__container}>
          <section>
            <div className={styles.hero}>
              <h1>Discover new awesome free games</h1>
              <div className={styles.searchContainer}>
                <input
                  type="text"
                  name="inputSearch"
                  id="inputSearch"
                  value={searchContent}
                  onChange={(e) => handleChange(e)}
                  placeholder="Enter a title to search"
                />
                <input type="button" value="Search" onClick={handleClick} />
              </div>
            </div>
          </section>

          <section className={styles.gamelist__container}>
            <h2>Check out this awesome games!</h2>
            <div className={styles.gamelist}>
              {data?.map((item) => (
                <GameItem key={crypto.randomUUID()} game={item} />
              ))}
            </div>
          </section>
        </main>
      </div>
    </>
  )
}
