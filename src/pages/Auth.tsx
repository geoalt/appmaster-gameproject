import { /* ArrowCircleLeft, */ GoogleLogo } from '@phosphor-icons/react'

import { FormEvent, useState } from 'react'
import { auth, googleProvider } from '../config/firebase'
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth'

import styles from './_auth.module.scss'

import { useNavigate } from 'react-router-dom'
import { createUser } from '../services/database'

export function Auth() {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  const [isSignInVisible, setIsSignInVisible] = useState(true)

  const navigate = useNavigate()

  async function signUp(e: FormEvent) {
    e.preventDefault()
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password)
      const {
        user: { uid },
      } = result

      createUser({ username, password, email, uid })
      navigate('/')
    } catch (error) {
      if (error instanceof Error) {
        alert('This email is already in use')
        console.error(error.message)
      }
    }
  }

  async function signIn(e: FormEvent) {
    e.preventDefault()
    try {
      await signInWithEmailAndPassword(auth, email, password)
      console.log(auth.currentUser)
      navigate('/')
    } catch (error) {
      if (error instanceof Error) {
        alert('Account not found')
        console.error(error.message)

        setIsSignInVisible(false)
      }
    }
  }

  async function signInWithGoogle(e: FormEvent) {
    e.preventDefault()
    try {
      const result = await signInWithPopup(auth, googleProvider)
      const {
        user: { displayName: username, email, uid },
      } = result

      createUser({ username, password, email, uid })
      navigate('/')
    } catch (error) {
      if (error instanceof Error) console.error(error.message)
    }
  }

  async function logout(e: FormEvent) {
    e.preventDefault()
    try {
      await signOut(auth)
    } catch (error) {
      if (error instanceof Error) console.error(error.message)
    }
  }

  return (
    <div className={styles.authContainer}>
      {/* <p className={styles.backButton}>
        <ArrowCircleLeft size={26} weight="bold" />
        Go Back
      </p> */}
      {isSignInVisible ? (
        <div>
          <h1>Sign In</h1>
          <form action="">
            <input
              type="text"
              name="signInEmail"
              id="signInEmail"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ textAlign: 'left' }}
            />

            <input
              type={isPasswordVisible ? 'text' : 'password'}
              name="signInPassword"
              id="signInPassword"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {/* <p>Forget password?</p> */}
            <button type="submit" onClick={(e) => signIn(e)}>
              Enter
            </button>
            <p className={styles.or}>
              <span>or</span>
            </p>
            <button className={styles.googleButton} onClick={signInWithGoogle}>
              <GoogleLogo size={32} weight="fill" />
              Sign In With Google
            </button>
            <p className={styles.textButton}>
              Don't have an account?{' '}
              <strong>
                <span onClick={() => setIsSignInVisible(!isSignInVisible)}>
                  Sign up
                </span>
              </strong>
            </p>
          </form>
        </div>
      ) : (
        <div>
          <h1>New Account</h1>
          <form action="">
            <button className={styles.googleButton} onClick={signInWithGoogle}>
              <GoogleLogo size={32} weight="fill" />
              Sign Up With Google
            </button>
            <p className={styles.or}>
              <span>or</span>
            </p>
            <input
              type="text"
              name="signUpUsername"
              id="signUpUsername"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={{ textAlign: 'left' }}
            />

            <input
              type="text"
              name="signUpEmail"
              id="signUpEmail"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ textAlign: 'left' }}
            />

            <input
              type="password"
              name="signUpPassword"
              id="signUpPassword"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit" onClick={signUp}>
              Sign Up
            </button>

            <p className={styles.textButton}>
              Already have an account?{' '}
              <strong>
                <span onClick={() => setIsSignInVisible(!isSignInVisible)}>
                  Sign in
                </span>
              </strong>
            </p>
          </form>
        </div>
      )}
      {/* <button onClick={logout}>Logout</button> */}
    </div>
  )
}
