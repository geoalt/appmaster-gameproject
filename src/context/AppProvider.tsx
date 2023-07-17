import { createContext, useMemo, useState } from 'react'
import { IDataItem } from '../interfaces/IDataItem'
import { IChildrenProp } from '../interfaces/IChildrenProp'
import { IContextProp } from '../interfaces/IContextProp'
import { User } from 'firebase/auth'
import { IUserData } from '../interfaces/IUserData'

export const AppContext = createContext<IContextProp>({} as IContextProp)

export function AppProvider({ children }: IChildrenProp) {
  const [data, setData] = useState<IDataItem[]>([])
  const [currentUser, setCurrentUser] = useState<User>({} as User)
  const [userData, setUserData] = useState<IUserData>({} as IUserData)
  const [isDataFetched, setIsDataFetched] = useState(false)

  const values = useMemo(
    () => ({
      data,
      currentUser,
      userData,
      isDataFetched,
      setData,
      setCurrentUser,
      setUserData,
      setIsDataFetched,
    }),
    [data, currentUser, userData, isDataFetched],
  )

  return <AppContext.Provider value={values}>{children}</AppContext.Provider>
}
