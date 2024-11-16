import { IItem } from "./item";

export interface ICustomerOrder {
  id: number;
  customerName: string;
  items: IItem[] | null;
  total: number | null;
}