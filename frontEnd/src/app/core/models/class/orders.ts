export class Order {
    order_id    : number = 0;
    local_id    : number = 0;
    client_id   : number = 0;
    date        : string = '';
    state       : string = '';
    address     : string = '';
    pay_method  : string = '';
    amount      : number = 0; // total
}

// únicamente cuando se confirma el carrito se instancia la clase Order.
