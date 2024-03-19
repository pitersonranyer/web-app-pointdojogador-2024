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
            { path: 'jogosCartola', loadChildren: () => import('./pages/cartola/jogos-cartola/jogos-cartola.module').then(m => m.JogosCartolaModule), data: { breadcrumb: 'Jogos Cartola' } },
            { path: 'meuTimeCartola', loadChildren: () => import('./pages/cartola/meu-time-cartola/meu-time-cartola.module').then(m => m.MeuTimeCartolaModule), data: { breadcrumb: 'Meus Times' } },
            { path: 'meuGrupoCartola', loadChildren: () => import('./pages/cartola/meu-grupo-cartola/meu-grupo-cartola.module').then(m => m.MeuGrupoCartolaModule), data: { breadcrumb: 'Meus Grupos' } },
            { path: 'atletaPontuadoCartola', loadChildren: () => import('./pages/cartola/atleta-pontuado-cartola/atleta-pontuado-cartola.module').then(m => m.AtletaPontuadoCartolaModule), data: { breadcrumb: 'Atletas Pontuados' } },
            { path: 'addTimeGrupoCartola', loadChildren: () => import('./pages/cartola/add-time-grupo-cartola/add-time-grupo-cartola.module').then(m => m.AddTimeGrupoCartolaModule), data: { breadcrumb: 'Adicionar Time' } },
            { path: 'listarTimeGrupoCartola', loadChildren: () => import('./pages/cartola/listar-time-grupo-cartola/listar-time-grupo-cartola.module').then(m => m.ListarTimeGrupoCartolaModule), data: { breadcrumb: 'Listar Time' } },
            { path: 'atletaTimeCartola', loadChildren: () => import('./pages/cartola/atleta-time-cartola/atleta-time-cartola.module').then(m => m.AtletaTimeCartolaModule), data: { breadcrumb: 'Time Favorito' } },
            { path: 'addTimeFavorito', loadChildren: () => import('./pages/cartola/add-time-favorito/add-time-favorito.module').then(m => m.AddTimeFavoritoModule), data: { breadcrumb: 'Adicionar Time' } },
            { path: 'competicaoLigaCartola', loadChildren: () => import('./pages/cartola/competicao-liga-cartola/competicao-liga-cartola.module').then(m => m.CompeticaoLigaCartolaModule), data: { breadcrumb: 'Competição Liga' } },
            { path: 'gerarCompeticaoLigaCartola', loadChildren: () => import('./pages/cartola/gerar-competicao-liga-cartola/gerar-competicao-liga-cartola.module').then(m => m.GerarCompeticaoLigaCartolaModule), data: { breadcrumb: 'Gerar Competição Liga' } },
            { path: 'gerarLigaCartola', loadChildren: () => import('./pages/cartola/gerar-liga-cartola/gerar-liga-cartola.module').then(m => m.GerarLigaCartolaModule), data: { breadcrumb: 'Gerar Liga' } },
            { path: 'participarCompeticaoCartola', loadChildren: () => import('./pages/cartola/participar-competicao-cartola/participar-competicao-cartola.module').then(m => m.ParticiparCompeticaoCartolaModule), data: { breadcrumb: 'Participar Competicao' } },
            { path: 'pixCheckout', loadChildren: () => import('./pages/pix-checkout/pix-checkout.module').then(m => m.PixCheckoutModule), data: { breadcrumb: 'Pix' } },
            { path: 'viewTimesCompeticao', loadChildren: () => import('./pages/cartola/listar-time-competicao/listar-time-competicao.module').then(m => m.ListarTimeCompeticaoModule), data: { breadcrumb: 'Times Competição' } },
            { path: 'carteira', loadChildren: () => import('./pages/carteira/carteira.module').then(m => m.CarteiraModule), data: { breadcrumb: 'Carteira' } },
            { path: 'gerenciarPerfil', loadChildren: () => import('./pages/gerenciar-perfil/gerenciar-perfil.module').then(m => m.CarteiraModule), data: { breadcrumb: 'Gerenciar Perfil' } },
            { path: 'provaveis', loadChildren: () => import('./pages/cartola/atleta-provavel/atleta-provavel.module').then(m => m.AtletProvavelModule), data: { breadcrumb: 'Prováveis' } },

            { path: 'sign-in', loadChildren: () => import('./pages/authentication/sign-in/sign-in.module').then(m => m.SignInModule), data: { breadcrumb: 'Sign In ' } },
            { path: 'verify-email-address', loadChildren: () => import('./pages/authentication/verify-email/verify-email.module').then(m => m.VerifyEmailModule), data: { breadcrumb: 'Verifica email' } },
            { path: 'forgot-password', loadChildren: () => import('./pages/authentication/forgot-password/forgot-password.module').then(m => m.ForgotPasswordModule), data: { breadcrumb: 'Esqueceu a senha' } },
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