import { ICoffee } from "./coffee";
import { ICustomerOrder } from "./customerOrder";
import { IItemId } from "./itemId";

export interface IItemDto {
  id: IItemId;
  coffee: ICoffee;
  customerOrder: ICustomerOrder;
  quantity: number;
}

