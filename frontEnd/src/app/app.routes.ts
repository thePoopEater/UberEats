import { Routes } from '@angular/router';
import { InicioComponent } from './features/pages/inicio/inicio/inicio.component';
import { LocalComponent } from './features/pages/local/local.component';
import { CarritoComponent } from './features/pages/carrito/carrito.component';
import { ProductoComponent } from './features/pages/producto/producto.component';
import { PagoComponent } from './features/pages/pago/pago.component';
import { ConfirmacionPedidoComponent } from './features/pages/confirmacion-pedido/confirmacion-pedido.component';
import { SeguimientoPedidoComponent } from './features/pages/seguimiento-pedido/seguimiento-pedido.component';

export const routes: Routes = [
    {path: '', component: InicioComponent},
    {
        path: 'local/:idLocal', 
        component: LocalComponent,
    },
    {
        path : 'local/:idLocal/product/:idProd',
        component : ProductoComponent
    },
    {path: 'carrito', component: CarritoComponent},
    {path: 'pagos', component: PagoComponent},
    {path: 'confirmacion-pedido', component: ConfirmacionPedidoComponent},
    {path: 'seguimiento-pedido', component: SeguimientoPedidoComponent}
];
