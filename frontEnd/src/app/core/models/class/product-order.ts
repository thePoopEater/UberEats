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