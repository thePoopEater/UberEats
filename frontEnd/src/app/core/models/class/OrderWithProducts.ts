import { Local } from "./local";
import { Order } from "./orders";
import { ProductsFromOrder } from "./ProductsFromOrder";
import { User } from "./User";

export class OrderWithProducts {
  local: Local = new Local();
  order: Order = new Order();
  user: User = new User("", "");
  productsOrder: ProductsFromOrder[] = [];
}
