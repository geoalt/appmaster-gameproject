import { IGameProp } from '../interfaces/IGameProp';
import style from './_gameitem.module.scss';

export function GameItem(props: IGameProp) {
  const { game } = props;

  return (
    <div className={style.card}>
      <div>
        <img src={game.thumbnail} alt={game.title} className={style.card__img} />
      </div>
      <div className={style.card__content}>
        <div className={style.content__title}>
          <p>{game.title}</p>
        </div>
        {/* <div className={style.card__description}>{game.short_description}</div> */}
        <div className={style.content__platforms}>
          <p>{game.platform}</p>
        </div>
        <div className={style.content__genre}>
          <p>{game.genre}</p>
        </div>
      </div>
    </div>
  );
}
