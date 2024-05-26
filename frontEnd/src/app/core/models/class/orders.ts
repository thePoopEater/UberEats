
export class Order {
    LocalId: number = 0;
    clientId: number = 0;
    date!:Date;
    state : string ='';
    address : string = '';
    payMethod : string = '';
    amount : number = 0;
}

// únicamente cuando se confirma el carrito se instancia la clase Order.
