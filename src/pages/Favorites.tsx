import { useEffect, useState } from 'react'
import { useFetch } from '../hooks/useFetch'
import { GameItem } from '../components/GameItem'
import { useNavigate } from 'react-router-dom'
import styles from './_favorites.module.scss'
import { Loading } from '../components/Loading'
import { Header } from '../components/Header'
import { useAppContext } from '../hooks/useAppContext'

import { getUserData } from '../services/database'
import { IUserData } from '../interfaces/IUserData'

export function Favorites() {
  const endpoint = 'https://games-test-api-81e9fb0d564a.herokuapp.com/api/data'
  const email = 'meu@email.com.br'

  const [loading, data, error] = useFetch(endpoint, email)
  const [filterByGenre, setFilterByGenre] = useState('')

  const [searchContent, setSearchContent] = useState('')

  const { setUserData, userData } = useAppContext()

  const myFavorites = userData?.favoritedGames?.map((game) => game.gameId)

  const showFavorites = data?.filter((game) =>
    myFavorites?.find((it) => it === game.id),
  )

  const navigate = useNavigate()

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

  function handleChange(e: { target: HTMLInputElement }): void {
    setSearchContent(e.target.value)
  }

  function handleClick(): void {
    navigate(`/games/search/${searchContent}`)
  }

  const genres = Array.from(new Set(showFavorites.map((item) => item.genre)))

  function handleChangeGenre(e: { target: HTMLSelectElement }): void {
    if (e.target.value === 'All') {
      setFilterByGenre('')
    } else {
      setFilterByGenre(e.target.value)
    }
  }

  return (
    <>
      <div>
        <main className={styles.home__container}>
          <section>
            <div className={styles.hero}>
              <header className={styles.header}>{<Header />}</header>
              <h1>My Favorites Game List</h1>
              <div className={styles.searchContainer}>
                <input
                  type="text"
                  name="inputSearch"
                  id="inputSearch"
                  value={searchContent}
                  onChange={(e) => handleChange(e)}
                  placeholder="Enter a title to search"
                />
                <input
                  type="button"
                  value="Search"
                  onClick={handleClick}
                  disabled={!searchContent}
                />
              </div>
            </div>
          </section>

          <section className={styles.gamelist__container}>
            <div className={styles.gamelist}>
              {showFavorites.map((item) => (
                <GameItem key={crypto.randomUUID()} game={item} />
              ))}
            </div>
          </section>
        </main>
      </div>
    </>
  )
}
