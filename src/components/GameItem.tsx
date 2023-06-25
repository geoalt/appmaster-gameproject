import { IGameProp } from '../interfaces/IGameProp';

export function GameItem(props: IGameProp) {
  const { game } = props;

  return (
    <div>
      <img src={game.thumbnail} alt={game.title} />
      <div>
        <div>{game.title}</div>
        <div>{game.short_description}</div>
        <div>{game.genre}</div>
      </div>
      <div>{game.platform}</div>
    </div>
  );
}
