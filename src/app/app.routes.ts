import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./Components/layout/layout.component'),
        children: [ 
            {
                path: 'dashboard',
                loadComponent: () => import('./Pages/dashboard/dashboard.component')
            },

            {
                path: 'colaboradores',
                loadComponent: () => import('./Pages/colaboradores/colaboradores.component')
            },

            {
                path: 'eventos',
                loadComponent: () => import('./Pages/eventos/eventos.component')
            },
            {
                path: 'detalleEvento',
                loadComponent: () => import('./Pages/detalle-evento/detalle-evento.component')
            },
            {
                path: '',
                redirectTo: 'dashboard',
                pathMatch: 'full'
            }
        ]
    },
    {
        path: 'login',
        loadComponent: () => import('./Pages/login/login.component')
    },
    {
        path: '**',
        redirectTo: 'dashboard'
    }
];
