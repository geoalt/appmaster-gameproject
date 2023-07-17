import { User } from "firebase/auth";
import { IDataItem } from "./IDataItem";
import { IUserData } from "./IUserData";

export interface IContextProp {
  data: IDataItem[];
  currentUser: User;
  userData: IUserData;
  isDataFetched: boolean;
  setData: React.Dispatch<React.SetStateAction<IDataItem[]>>;
  setCurrentUser: React.Dispatch<React.SetStateAction<User>>;
  setUserData: React.Dispatch<React.SetStateAction<IUserData>>;
  setIsDataFetched: React.Dispatch<React.SetStateAction<boolean>>;
}