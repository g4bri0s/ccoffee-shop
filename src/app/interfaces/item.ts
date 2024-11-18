import { ICoffee } from "./coffee";
import { ICustomerOrder } from "./customerOrder";
import { IItemId } from "./itemId";

export interface IItem {
  coffeeId: number;
  coffeeName: string;
  coffeePrice: number;
  quantity: number;
}

