import { Route, Routes } from 'react-router-dom';
import { Home } from './pages/Home';
import { GameList } from './pages/GameList';
import { Game } from './pages/Game';
import { NotFound } from './pages/NotFound';

export function App() {
  return (
    <div>
      <header>Header</header>

      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="games">
          <Route path="search/:str" element={<GameList />}></Route>
          <Route path=":id" element={<Game />}></Route>
        </Route>
        <Route path="*" element={<NotFound />}></Route>
      </Routes>

      <footer>Footer</footer>
    </div>
  );
}
