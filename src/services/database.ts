import {auth, database} from '../config/firebase';
import {collection, addDoc, getDoc, getDocs, doc, updateDoc} from 'firebase/firestore';
import { IFav, IRate, IUpdateFavorite, IUpdateRate, IUserData } from '../interfaces/IUserData';

const userCollectionRef = collection(database, 'users');


export async function getUsersList() {
  const usersList = await getDocs(collection(database, 'users'))

  const filteredData = usersList.docs.map((doc) => ({
      data: {...doc.data()},
      id: doc.id,
    }))

  return filteredData;
}

export async function getUserAuthId() {
    const filteredData = await getUsersList()
    const currentUser = auth.currentUser

    const user = filteredData.find(user => user.data.email === currentUser?.email)
    
    return user
}

export async function getUserData() {
  const userDocId = await getUserAuthId()
  if (userDocId) {
    const userUpdateRef = doc(database, 'users', userDocId.id)
    const userSnap = await getDoc(userUpdateRef)

    if (userSnap.exists()) {
    const snapData = userSnap.data()
    return snapData
    }
  }
}

export async function createUser(data: IUserData) {
  const filteredData = await getUsersList();
  const checkUserExist = filteredData.find(user => user.data.email === data.email)

  if (checkUserExist) return;

  await addDoc(userCollectionRef, {
    uid: data.uid,
    username: data.username,
    email: data.email,
    password: data.password,
    ratedGames: [],
    favoritedGames: []
  })
}  

export async function rateGame(data: IUpdateRate) {
  const userDocId = await getUserAuthId()
  if (userDocId) {
    const userUpdateRef = doc(database, 'users', userDocId.id)
    const userSnap = await getDoc(userUpdateRef)

    if (userSnap.exists()) {
    const snapData = userSnap.data()
      const ratedGames: IRate[] = snapData.ratedGames
      const newValues = {gameId: data.id, rate: data.stars}
      
      const gameAlreadyRated = ratedGames.find((game: {gameId: number}) => (
        game.gameId === data.id
      ))


      if (gameAlreadyRated) {
        const updatedRatedGamesList = ratedGames.map((game: IRate) => {
          if (game.gameId === data.id) {
            return {...game, rate: data.stars}
          }

          return game
        })

        await updateDoc(userUpdateRef, {
          ratedGames: updatedRatedGamesList
        })
     } else {
        await updateDoc(userUpdateRef, {
          ratedGames: [...ratedGames, newValues]
        })
     }
    }
  }
}

export async function favoriteGame(data: IUpdateFavorite) {
  const userDocId = await getUserAuthId()
  if (userDocId) {
    const userUpdateRef = doc(database, 'users', userDocId.id)
    const userSnap = await getDoc(userUpdateRef)

    if (userSnap.exists()) {
    const snapData = userSnap.data()
      const favoritedGames: IFav[] = snapData.favoritedGames
      const newValue = {gameId: data.id}
      
      const gameAlreadyFavorited = favoritedGames.find((game: {gameId: number}) => (
        game.gameId === data.id
      ))


      if (gameAlreadyFavorited) {
        const updatedFavoritedGamesList = favoritedGames.filter((game: IFav) => game.gameId !== data.id)

        await updateDoc(userUpdateRef, {
          favoritedGames: updatedFavoritedGamesList
        })
     } else {
        await updateDoc(userUpdateRef, {
          favoritedGames: [...favoritedGames, newValue]
        })
     }
    }
  }
}

