import { Routes } from "@angular/router";
import { LocalComponent } from "./features/pages/local/local.component";
import { CarritoComponent } from "./features/pages/carrito/carrito.component";
import { ProductoComponent } from "./features/pages/producto/producto.component";
import { PagoComponent } from "./features/pages/pago/pago.component";
import { ConfirmacionPedidoComponent } from "./features/pages/confirmacion-pedido/confirmacion-pedido.component";
import { SeguimientoPedidoComponent } from "./features/pages/seguimiento-pedido/seguimiento-pedido.component";
import {
  authGuard,
  loginGuard,
} from "./core/auth/guards/login-guard/login.guard";
import { NotFoundComponent } from "./features/pages/not-found/not-found/not-found.component";
import { hasRoleGuard } from "./core/auth/guards/has-role-guard/has-role.guard";
import { HomeComponent } from "./features/pages/home/home.component";
import { SignupDeliverComponent } from "./features/pages/signup-deliver/signup-deliver.component";
import { DeliverComponent } from "./features/pages/deliver/deliver.component";
import { SignupLocalComponent } from "./features/pages/signup-local/signup-local.component";
import { InicioComponent } from "./features/pages/inicio/inicio/inicio.component";
import { LoginComponent } from "./features/pages/login/login/login.component";
import { SignupComponent } from "./features/pages/signup/signup/signup.component";
import { LocalAdminComponent } from "./features/pages/local-admin/local-admin.component";

export const routes: Routes = [
  {
    path: "",
    redirectTo: "/home",
    pathMatch: "full",
  }, // inicio
  {
    path: "home",
    component: HomeComponent,
  },
  {
    path: "signup",
    component: SignupComponent,
  },
  {
    path: "signup/delivery",
    component: SignupDeliverComponent,
  },
  {
    path: "deliver",
    component: DeliverComponent,
  },
  {
    path: "signup/local",
    component: SignupLocalComponent,
  },
  {
    path: "local/admin",
    component: LocalAdminComponent,
    data: { role: "localAdmin" },
    
  },
  {
    path: "login",
    component: LoginComponent,
  },

  {
    path: "inicio",
    component: InicioComponent,
    canActivate: [hasRoleGuard],
    data: { role: "client" },
  },

  {
    path: "local/:{idLocal}",
    component: LocalComponent,
    canActivate: [hasRoleGuard],
    data: { role: "client" },
  },

  {
    path: "producto/:{idProd}",
    component: ProductoComponent,
    canActivate: [hasRoleGuard],
    data: { role: "client" },
  },

  {
    path: "carrito",
    component: CarritoComponent,
    canActivate: [hasRoleGuard],
    data: { role: "client" },
  },

  {
    path: "pagos",
    component: PagoComponent,
    canActivate: [hasRoleGuard],
    data: { role: "client" },
  },

  {
    path: "confirmacion-pedido",
    component: ConfirmacionPedidoComponent,
    canActivate: [hasRoleGuard],
    data: { role: "client" },
  },

  {
    path: "seguimiento-pedido",
    component: SeguimientoPedidoComponent,
    canActivate: [hasRoleGuard],
    data: { role: "client" },
  },

  {
    path: "not-found",
    component: NotFoundComponent,
  },

  {
    path: "**",
    redirectTo: "/not-found",
    pathMatch: "full",
  },
];
