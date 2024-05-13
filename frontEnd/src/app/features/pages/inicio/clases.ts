export class Product {
    id : number;
    name: string;
    description : string;
    price: number;
    img: string;
    cantidad : number;

    constructor(id:number, name:string, desc:string, price:number, img: string, cantidad:number){
        this.id = id;
        this.name = name;
        this.description = desc
        this.price = price;
        this.img = img;
        this.cantidad = cantidad;
    }
}

export class Local {
    idLocal: number;
    nombre: string;
    direccion: string; 
    tiposProductos: Array<string>;
    costoEnvio: number;
    tiempoEntrega: Array<number>;
    calificacion: number;
    productos: Array<Product>;

    constructor (idLocal: number, nombre: string, direccion: string, tiposProductos: Array<string>, costoEnvio: number, tiempoEntrega: Array<number>, calificacion: number, productos: Array<Product>){
        this.idLocal = idLocal;
        this.nombre = nombre;
        this.direccion = direccion;
        this.tiposProductos = tiposProductos;
        this.costoEnvio = costoEnvio;
        this.tiempoEntrega = tiempoEntrega;
        this.calificacion = calificacion;
        this.productos = productos;
    }
}

