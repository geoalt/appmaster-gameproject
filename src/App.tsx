import { Route, Routes } from 'react-router-dom'
import { Home } from './pages/Home'
import { GameList } from './pages/GameList'
import { NotFound } from './pages/NotFound'
import { Auth } from './pages/Auth'
import { Favorites } from './pages/Favorites'

export function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="games">
          <Route path="search/:str" element={<GameList />}></Route>
        </Route>
        <Route path="/auth" element={<Auth />}></Route>
        <Route path="/favorites" element={<Favorites />}></Route>
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </div>
  )
}
