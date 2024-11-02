import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'pagina',
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
                path: 'organizaciones',
                loadComponent: () => import('./Pages/organizaciones/organizaciones.component')
            },
            {
                path: 'registrarOrganizacion',
                loadComponent: () => import('./Pages/registrar-organizacion/registrar-organizacion.component')
            },
            {
                path: '',
                redirectTo: 'dashboard',
                pathMatch: 'full'
            }
        ]
    },
    {
        path: '',
        loadComponent: () => import('./Pages/login/login.component')
    },
    {
        path: '**',
        redirectTo: 'dashboard'
    }
];
