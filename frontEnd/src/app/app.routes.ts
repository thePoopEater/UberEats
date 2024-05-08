import { Routes } from '@angular/router';
import { InicioComponent } from './container/inicio/inicio/inicio.component';
import { LocalComponent } from './pages/local/local.component';
import { CarritoComponent } from './pages/carrito/carrito.component';
import { ProductoComponent } from './pages/producto/producto.component';
import { FooterHomeComponent } from './container/inicio/components/footer-home/footer-home.component';
import { PagoComponent } from './pages/pago/pago.component';
import { TestAPIComponent } from './test-components/test-api/test-api.component';
import { ConfirmacionPedidoComponent } from './pages/confirmacion-pedido/confirmacion-pedido.component';
import { SeguimientoPedidoComponent } from './pages/seguimiento-pedido/seguimiento-pedido.component';

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
    {path: 'footer', component: FooterHomeComponent},
    {path: 'pagos', component: PagoComponent},
    {path: 'test', component: TestAPIComponent},
    {path: 'confirmacion-pedido', component: ConfirmacionPedidoComponent},
    {path: 'seguimiento-pedido', component: SeguimientoPedidoComponent}
];
