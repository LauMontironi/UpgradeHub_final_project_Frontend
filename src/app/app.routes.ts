import { Menu } from './Pages/menu/menu';
import { Routes } from '@angular/router';
import { Home } from './Pages/home/home';
import { Login } from './Pages/login/login';
import { Registro } from './Pages/registro/registro';
import { Reservas } from './Pages/reservas/reservas';
import { Pedidos } from './Pages/pedidos/pedidos';
import { MenuDetail } from './Pages/menu-detail/menu-detail';

export const routes: Routes = [
    { path: '', component: Home },
    { path: 'landing', component: Home },
    { path: 'menus', component: Menu },
    { path: 'menu-detail', component: MenuDetail },
    { path: 'login', component: Login },
    { path: 'registro', component: Registro },
    { path: 'reservas', component: Reservas },
    { path: 'pedidos', component: Pedidos },
];
