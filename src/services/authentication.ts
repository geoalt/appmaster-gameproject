import { signOut } from "firebase/auth"
import { FormEvent } from "react"
import { auth } from "../config/firebase"



export async function logout() {
    try {
      await signOut(auth)
    } catch (error) {
      if (error instanceof Error) console.error(error.message)
    }
  }