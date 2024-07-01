import { Routes } from "@angular/router";
import { LocalComponent } from "./features/pages/local/local.component";
import { CarritoComponent } from "./features/pages/carrito/carrito.component";
import { ProductoComponent } from "./features/pages/producto/producto.component";
import { PagoComponent } from "./features/pages/pago/pago.component";
import { ConfirmacionPedidoComponent } from "./features/pages/confirmacion-pedido/confirmacion-pedido.component";
import { SeguimientoPedidoComponent } from "./features/pages/seguimiento-pedido/seguimiento-pedido.component";
import { authGuard } from "./core/auth/guards/login-guard/login.guard";
import { NotFoundComponent } from "./features/pages/not-found/not-found/not-found.component";
import { hasRoleGuard } from "./core/auth/guards/has-role-guard/has-role.guard";
import { HomeComponent } from "./features/pages/home/home.component";
import { SignupDeliverComponent } from "./features/pages/signup-deliver/signup-deliver.component";
import { DeliverComponent } from "./features/pages/deliver/deliver.component";
import { SignupLocalComponent } from "./features/pages/signup-local/signup-local.component";
import { InicioComponent } from "./features/pages/inicio/inicio/inicio.component";
import { LoginComponent } from "./features/pages/login/login/login.component";
import { SignupComponent } from "./features/pages/signup/signup/signup.component";
import { ProfileComponent } from "./features/pages/profile/profile.component";
import { OrdersUserComponent } from "./features/pages/orders-user/orders-user.component";
import { ROLES } from "./core/enviroment/enviroment";
import { OrdersDeliverComponent } from "./features/pages/orders-deliver/orders-deliver.component";

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
    canActivate: [hasRoleGuard],
    data: { role: ROLES.DELIVERY },
  },
  {
    path: "signup/local",
    component: SignupLocalComponent,
  },

  {
    path: "adminLocal",
    loadChildren: () =>
      import("./features/pages/local-admin/local-admin.routes"),
    data: { role: ROLES.LOCALADMIN },
  },

  {
    path: "login",
    component: LoginComponent,
  },

  {
    path: "inicio",
    component: InicioComponent,
    canActivate: [hasRoleGuard],
    data: { role: ROLES.CLIENT },
  },
  {
    path: "profile",
    component: ProfileComponent,
    canActivate: [authGuard],
    data: {},
  },
  {
    path: "orders",
    component: OrdersUserComponent,
    canActivate: [hasRoleGuard],
    data: { role: ROLES.CLIENT },
  },
  {
    path: "orders/deliver",
    component: OrdersDeliverComponent,
    canActivate: [hasRoleGuard],
    data: { role: ROLES.DELIVERY },
  },
  {
    path: "local/:{idLocal}",
    component: LocalComponent,
    canActivate: [hasRoleGuard],
    data: { role: ROLES.CLIENT },
  },

  {
    path: "producto/:{idProd}",
    component: ProductoComponent,
    canActivate: [hasRoleGuard],
    data: { role: ROLES.CLIENT },
  },

  {
    path: "carrito",
    component: CarritoComponent,
    canActivate: [hasRoleGuard],
    data: { role: ROLES.CLIENT },
  },

  {
    path: "pagos",
    component: PagoComponent,
    canActivate: [hasRoleGuard],
    data: { role: ROLES.CLIENT },
  },

  {
    path: "confirmacion-pedido",
    component: ConfirmacionPedidoComponent,
    canActivate: [hasRoleGuard],
    data: { role: ROLES.CLIENT },
  },

  {
    path: "seguimiento-pedido",
    component: SeguimientoPedidoComponent,
    canActivate: [hasRoleGuard],
    data: { role: ROLES.CLIENT },
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
