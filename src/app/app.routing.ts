import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

import { PagesComponent } from './pages/pages.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

export const routes: Routes = [
    {
        path: '',
        component: PagesComponent, children: [
            { path: '', loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule) },
            { path: 'cart', loadChildren: () => import('./pages/cart/cart.module').then(m => m.CartModule), data: { breadcrumb: 'Cart' } },
            { path: 'contact', loadChildren: () => import('./pages/contact/contact.module').then(m => m.ContactModule), data: { breadcrumb: 'Contact' } },
            { path: 'jogosCartola', loadChildren: () => import('./pages/jogos-cartola/jogos-cartola.module').then(m => m.JogosCartolaModule), data: { breadcrumb: 'Jogos Cartola' } },
            { path: 'meuTimeCartola', loadChildren: () => import('./pages/meu-time-cartola/meu-time-cartola.module').then(m => m.MeuTimeCartolaModule), data: { breadcrumb: 'Meus Times' } },
            { path: 'meuGrupoCartola', loadChildren: () => import('./pages/meu-grupo-cartola/meu-grupo-cartola.module').then(m => m.MeuGrupoCartolaModule), data: { breadcrumb: 'Meus Grupos' } },
            { path: 'atletaPontuadoCartola', loadChildren: () => import('./pages/atleta-pontuado-cartola/atleta-pontuado-cartola.module').then(m => m.AtletaPontuadoCartolaModule), data: { breadcrumb: 'Atletas Pontuados' } },
            { path: 'sign-in', loadChildren: () => import('./pages/sign-in/sign-in.module').then(m => m.SignInModule), data: { breadcrumb: 'Sign In ' } },
        ]
    },
    /* { path: 'landing', loadChildren: () => import('./landing/landing.module').then(m => m.LandingModule) }, */
    /* { path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) }, */
    { path: '**', component: NotFoundComponent }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {
            preloadingStrategy: PreloadAllModules,
            initialNavigation: 'enabledBlocking'
        })
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule { }