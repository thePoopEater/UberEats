export class ProductOrder {

    quantity : number = 0;
    specification : string = '';
    productId : number = 0;
    orderId : number = 0;


    constructor(quantity : number, specification : string, productId : number, orderId : number){
        this.quantity = quantity;
        this.specification = specification;
        this.productId = productId;
        this.orderId = orderId;
    }
}

export class ProductOrderResponse {
    orderProduct_quantity : number = 0;
    product_name : string = "";
    product_price : number = 0;
    orderProd_subtotal : number = this.orderProduct_quantity * this.product_price;

    constructor(quantity : number, product_name : string, product_price : number){
        this.orderProduct_quantity = quantity;
        this.product_name = product_name
        this.product_price = product_price
        this.orderProd_subtotal = this.orderProduct_quantity*product_price
    }
}