import { Routes } from '@angular/router';
import { InicioComponent } from './features/pages/inicio/inicio/inicio.component';
import { LocalComponent } from './features/pages/local/local.component';
import { CarritoComponent } from './features/pages/carrito/carrito.component';
import { ProductoComponent } from './features/pages/producto/producto.component';
import { PagoComponent } from './features/pages/pago/pago.component';
import { ConfirmacionPedidoComponent } from './features/pages/confirmacion-pedido/confirmacion-pedido.component';
import { SeguimientoPedidoComponent } from './features/pages/seguimiento-pedido/seguimiento-pedido.component';
import { notLogged, authGuard } from './core/auth/guards/login-guard/login.guard';
import { LoginComponent } from './features/pages/login/login/login.component';
import { NotFoundComponent } from './features/pages/not-found/not-found/not-found.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: '/login',
        pathMatch: 'full',
    },// inicio

    {path: 'login', 
    component: LoginComponent},

    {
        path: 'inicio', 
        component: InicioComponent, 
        canActivate: [authGuard]
    },

    {path: 'local/:nombre_local', 
    component: LocalComponent, 
    canActivate: [authGuard]},

    {path: 'producto', 
    component: ProductoComponent, 
    canActivate: [authGuard]},

    {path: 'carrito', 
    component: CarritoComponent, 
    canActivate: [authGuard]},


    {path: 'pagos', 
    component: PagoComponent, 
    canActivate: [authGuard]},


    {
        path: 'confirmacion-pedido', 
        component: ConfirmacionPedidoComponent, 
        canActivate: [authGuard]
    },

    {path: 'seguimiento-pedido', 
    component: SeguimientoPedidoComponent, 
    canActivate: [authGuard]},

    {
        path : 'not-found',
        component :NotFoundComponent
    },

    {
        path: '**',
        redirectTo: '/not-found',
        pathMatch: 'full' 
    },
];
