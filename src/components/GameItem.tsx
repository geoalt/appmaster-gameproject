import { Link } from 'react-router-dom'
import { IGameProp } from '../interfaces/IGameProp'
import style from './_gameitem.module.scss'
import { ArrowSquareOut, Heart, Star } from '@phosphor-icons/react'

export function GameItem(props: IGameProp) {
  const { game } = props
  const num = 3

  return (
    <div className={style.card}>
      <img src={game.thumbnail} alt={game.title} className={style.card__img} />
      <button className={style.favorite}>
        <Heart size={24} weight="fill" />
      </button>
      <div className={style.card__content}>
        <p className={style.content__title}>{game.title}</p>
        {}
        <div className={style.rating_container}>
          <input
            type="radio"
            name={`rate-${game.id}`}
            id={`rate-5-${game.id}`}
            onChange={() => console.log('rate-5')}
          />
          <label htmlFor={`rate-5-${game.id}`}>★</label>
          <input
            type="radio"
            name={`rate-${game.id}`}
            id={`rate-4-${game.id}`}
            onChange={() => console.log('rate-4')}
          />
          <label htmlFor={`rate-4-${game.id}`}>★</label>
          <input
            type="radio"
            name={`rate-${game.id}`}
            id={`rate-3-${game.id}`}
            onChange={() => console.log('rate-3')}
          />
          <label htmlFor={`rate-3-${game.id}`}>★</label>
          <input
            type="radio"
            name={`rate-${game.id}`}
            id={`rate-2-${game.id}`}
            onChange={() => console.log('rate-2')}
          />
          <label htmlFor={`rate-2-${game.id}`}>★</label>
          <input
            type="radio"
            name={`rate-${game.id}`}
            id={`rate-1-${game.id}`}
            onChange={() => console.log('rate-1')}
          />
          <label htmlFor={`rate-1-${game.id}`}>★</label>
        </div>
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
