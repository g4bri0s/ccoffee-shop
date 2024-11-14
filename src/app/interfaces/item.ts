import { IRegisterCoffee } from "./registerCoffee";

export interface IItem {
    id: number;
    name: string;
    price: number;
    coffee: IRegisterCoffee
  }

  