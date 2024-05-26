
export class Order {
    orderId : number = 0;
    localId: number = 0;
    clientId: number = 0;
    date!:Date;
    state : string ='';
    address : string = '';
    payMethod : string = '';
    amount : number = 0;
}

export class GenerateOrder{
    localId: number = 0;
    clientId: number = 0;
    date! :Date;
    state : string ='';
    address : string = '';
    payMethod : string = '';
    amount : number = 0;

    constructor(local_id: number, client_id: number) {
        this.localId = local_id;
        this.clientId = client_id;
        this.date = new Date();
        this.state = 'pending';
        this.address = 'cualquierlao';
        this.payMethod = 'efectivo';
        this.amount = 0;
      }
}

// únicamente cuando se confirma el carrito se instancia la clase Order.
