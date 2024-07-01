export class Order {
  orderId: number = 0;
  localId: number = 0;
  userId: number = 0;
  date!: Date;
  state: string = "";
  address: string = "";
  payMethod: string = "";
  amount: number = 0;
}

export class OrderCreateDTO {
  localId: number = 0;
  userId: number = 0;
  date!: Date;
  state: string = "";
  address: string = "";
  payMethod: string = "";
  amount: number = 0;

  constructor(local_id: number, userId: number) {
    this.localId = local_id;
    this.userId = userId;
    this.date = new Date();
    this.state = "Carrito";
    this.address = "Falta";
    this.payMethod = "Falta";
    this.amount = 0;
  }
}
