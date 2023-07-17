export interface IFav {
  gameId: number;
}

export interface IRate {
  gameId: number;
  rate: number;
}

export interface IUserData {
  uid: string | null;
  username: string | null;
  email: string | null;
  password: string;
  favoritedGames?: IFav[];
  ratedGames?: IRate[];
}

export interface ISignIn {
  email: string;
  password: string;
}

export interface IUpdateRate {
  id: number;
  stars: number;
}

export interface IUpdateFavorite {
  id: number;
}