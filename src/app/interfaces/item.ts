import { ICoffee } from "./coffee";

export interface IItem {
  id: number;
  name: string;
  price: number;
  coffee: ICoffee
}

