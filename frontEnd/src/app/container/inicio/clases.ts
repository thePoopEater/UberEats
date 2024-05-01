export class Product {
    id : number;
    name: string;
    description : string;
    cantidad : number
    constructor(id:number, name:string, desc:string, cantidad:number){
        this.id = id;
        this.name = name;
        this.description = desc
        this.cantidad = cantidad;
    }
}

