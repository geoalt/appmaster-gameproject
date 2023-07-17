import { Link, useNavigate } from 'react-router-dom'
import styles from './_header.module.scss'
import { useAppContext } from '../hooks/useAppContext'
import { auth } from '../config/firebase'
import { useEffect, useState } from 'react'
import { getUserAuthId } from '../services/database'
import { SignOut } from '@phosphor-icons/react'
import { logout } from '../services/authentication'
import { User } from 'firebase/auth'

export function Header() {
  const { currentUser, setCurrentUser } = useAppContext()
  const [username, setUsername] = useState('')

  const navigate = useNavigate()

  useEffect(() => {
    if (auth.currentUser) setCurrentUser(auth.currentUser)
  }, [setCurrentUser])

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-extra-semi
    ;(async () => {
      const user = await getUserAuthId()
      setUsername(user?.data.username)
    })()
  }, [])

  function handleLogout() {
    logout()
    setCurrentUser({} as User)
  }

  function handleClick() {
    navigate('/favorites')
  }

  return (
    <header className={styles.header}>
      {currentUser.uid ? (
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <p onClick={handleClick} style={{ cursor: 'pointer' }}>
            {username}'s favorite games
          </p>
          <p> | </p>
          <p
            onClick={handleLogout}
            style={{ display: 'flex', gap: '10px', alignItems: 'center' }}
          >
            Logout <SignOut size={18} weight="bold" />
          </p>
        </div>
      ) : (
        <Link to={'/auth'}>
          <p>Sign in</p>
        </Link>
      )}
    </header>
  )
}
