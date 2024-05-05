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


export class Local{

    private _name :string;
    private _costDeliv:number;

    constructor(name : string, cost_del : number){
        this._name = name;
        this._costDeliv = cost_del;
    }

    public getName(){
        return this._name;
    }

    public getCostDel(){
        return this._costDeliv;
    }
}
