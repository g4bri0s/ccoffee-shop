interface IItem {
    coffeeId: Number;
    coffeeName: String;
    coffeePrice: Number;
    quantity: Number;
  }

export interface ICustomerOrderItem{
    id: Number;
    customerName: String;
    item: IItem[];
    total: Number;
}

/*
{"id":1,
"customerName":"John Doe",
"items":[{
    "coffeeId":1,
    "coffeeName":"Espresso",
    "coffeePrice":2.0,
    "quantity":1.0}],
"total":2.0}
*/