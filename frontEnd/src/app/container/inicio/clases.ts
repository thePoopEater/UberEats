export class Product {
    id : number;
    name: string;
    description : string;
    price: number;
    img: string;
    cantidad : number
    constructor(id:number, name:string, desc:string, price:number, img: string, cantidad:number){
        this.id = id;
        this.name = name;
        this.description = desc
        this.price = price;
        this.img = img;
        this.cantidad = cantidad;
    }
}

