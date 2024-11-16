import { ICoffee } from "./coffee";
import { ICustomerOrder } from "./customerOrder";
import { IItemId } from "./itemId";

export interface IItem {
  id: IItemId;
  coffee: ICoffee;
  customerOrder: ICustomerOrder;
  quantity: number;
}

