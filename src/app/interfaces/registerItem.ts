import { ICoffee } from "./coffee";
import { ICustomerOrder } from "./customerOrder";

export interface IRegisterItem {
  coffee: ICoffee;
  customerOrder: ICustomerOrder;
  quantity: number;
}
