import { Routes } from "@angular/router";

export const routes : Routes = [


    {
        path: '',
        loadComponent: () => import('./local-admin.component'),
    },

    {
        path: 'pedidos',
        loadComponent: () => import('./ver-pedidos/ver-pedidos.component')
    },
    {
        path: 'editar/:idLocal',
        loadComponent: () => import('./editar-datos/editar-datos.component')
    }
]

export default routes