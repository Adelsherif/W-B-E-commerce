import { Routes, ActivatedRoute } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { askGuardGuard } from './core/guards/ask.guard-guard';

export const routes: Routes = [
  {path:'' , loadComponent: () => import('./layouts/auth/auth').then(c => c.Auth),
    children:[
      {path:'',loadComponent:() => import('./pages/public-home/public-home').then(c => c.PublicHome),},
      {path: 'login', loadComponent: () => import('./pages/login/login').then((c) => c.Login)},
      {path: 'register', loadComponent: () => import('./pages/register/register').then((c) => c.Register),
        canDeactivate:[askGuardGuard]
      },
       {path: 'details/:id',loadComponent: () => import('./components/product-details/product-details').then(c => c.ProductDetails)
      },
      {path: 'cart' , loadComponent:() => import('./components/cart/cart').then(c => c.Cart)}

    ]
  },
  {path:'user' , loadComponent: () => import('./layouts/user/user').then(c => c.User),
    children:[
      {path: 'login', loadComponent: () => import('./pages/login/login').then((c) => c.Login)},

      {path:'home', loadComponent: () => import('./pages/home/home').then(c => c.Home),
        canActivate:[authGuard]
      },
      {path: 'details/:id',loadComponent: () => import('./components/product-details/product-details').then(c => c.ProductDetails)
      },
      {path: 'cart' , loadComponent:() => import('./components/cart/cart').then(c => c.Cart)}
    ],
    canActivate:[authGuard]
  },
];


