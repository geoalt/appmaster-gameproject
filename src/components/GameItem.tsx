import { Link, useNavigate } from 'react-router-dom'
import { IGameProp } from '../interfaces/IGameProp'
import style from './_gameitem.module.scss'
import { ArrowSquareOut, Heart } from '@phosphor-icons/react'
import { useAppContext } from '../hooks/useAppContext'
import { useEffect, useState } from 'react'
import { favoriteGame, getUserData, rateGame } from '../services/database'
import { IUserData } from '../interfaces/IUserData'

export function GameItem(props: IGameProp) {
  const { game } = props

  const [isRateMouseEnter, setIsRateMouseEnter] = useState(false)
  const [stars, setStars] = useState(0)
  const [isFavorite, setIsFavorite] = useState(false)
  const [isReloading, setIsReloading] = useState(false)
  const { currentUser, userData } = useAppContext()

  const [userLocalData, setUserLocalData] = useState({} as IUserData)
  const navigate = useNavigate()

  async function handleFavorite(id: number) {
    if (!currentUser.uid) navigate('/auth')
    setIsFavorite((state) => !state)
    setIsReloading((state) => !state)
    if (!isReloading) {
      favoriteGame({ id })
      const refreshedData = await getUserData()
      setUserLocalData(refreshedData as IUserData)
    }

    setIsReloading((state) => !state)
  }

  async function handleRate(e: { target: HTMLInputElement }, id: number) {
    if (!currentUser.uid) navigate('/auth')
    setStars(+e.target.value)
    const value = Number(e.target.value)

    setIsReloading((state) => !state)
    if (!isReloading) {
      rateGame({ id, stars: value })
      const refreshedData = await getUserData()
      setUserLocalData(refreshedData as IUserData)
    }

    setIsReloading((state) => !state)
  }

  function handleMouse() {
    setIsRateMouseEnter(!isRateMouseEnter)
  }

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-extra-semi
    ;(async () => {
      const fireData = await getUserData()
      setUserLocalData(fireData as IUserData)
    })()
  }, [isReloading])

  const countStars = userLocalData?.ratedGames?.find(
    (it) => it.gameId === game.id,
  )?.rate
  return (
    <div className={style.card}>
      <img src={game.thumbnail} alt={game.title} className={style.card__img} />
      <button
        className={style.favorite}
        onClick={() => handleFavorite(game.id)}
      >
        {userLocalData?.favoritedGames?.find(
          (fav) => fav.gameId === game.id,
        ) ? (
          <Heart color="#f90e16" size={24} weight="fill" />
        ) : (
          <Heart size={24} weight="fill" />
        )}
      </button>
      <div
        className={style.card__content}
        onMouseEnter={handleMouse}
        onMouseLeave={handleMouse}
      >
        <p className={style.content__title}>{game.title}</p>
        {}
        {isRateMouseEnter ? (
          <div className={style.rating_container}>
            <input
              type="radio"
              name={`rate-${game.id}`}
              id={`rate-5-${game.id}`}
              value={5}
              checked={stars === 5}
              onChange={(e) => handleRate(e, game.id)}
            />
            <label htmlFor={`rate-5-${game.id}`}>★</label>
            <input
              type="radio"
              name={`rate-${game.id}`}
              id={`rate-4-${game.id}`}
              value={4}
              checked={stars === 4}
              onChange={(e) => handleRate(e, game.id)}
            />
            <label htmlFor={`rate-4-${game.id}`}>★</label>
            <input
              type="radio"
              name={`rate-${game.id}`}
              id={`rate-3-${game.id}`}
              value={3}
              checked={stars === 3}
              onChange={(e) => handleRate(e, game.id)}
            />
            <label htmlFor={`rate-3-${game.id}`}>★</label>
            <input
              type="radio"
              name={`rate-${game.id}`}
              id={`rate-2-${game.id}`}
              value={2}
              checked={stars === 2}
              onChange={(e) => handleRate(e, game.id)}
            />
            <label htmlFor={`rate-2-${game.id}`}>★</label>
            <input
              type="radio"
              name={`rate-${game.id}`}
              id={`rate-1-${game.id}`}
              value={1}
              checked={stars === 1}
              onChange={(e) => handleRate(e, game.id)}
            />
            <label htmlFor={`rate-1-${game.id}`}>★</label>
          </div>
        ) : (
          <div className={style.notRated}>
            <span>{'★ '.repeat(countStars as number)}</span>
            {typeof countStars === 'number'
              ? '★ '.repeat(5 - (countStars as number))
              : '★ '.repeat(5)}
          </div>
        )}

        <p className={style.content__description}>{game.short_description}</p>
        <div>
          <p className={style.content__genre}>{game.genre}</p>
          <p className={style.content__platforms}>{game.platform}</p>
        </div>
        <Link to={game.game_url} className={style.link}>
          Visit Webpage <ArrowSquareOut size={20} weight="bold" />
        </Link>
      </div>
    </div>
  )
}
