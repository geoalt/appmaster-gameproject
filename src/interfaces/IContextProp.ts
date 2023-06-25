import { IDataItem } from "./IDataItem";

export interface IContextProp {
  data: IDataItem[];
  response: IDataItem[];
  setData: React.Dispatch<React.SetStateAction<IDataItem[]>>;
  setResponse: React.Dispatch<React.SetStateAction<IDataItem[]>>;
}