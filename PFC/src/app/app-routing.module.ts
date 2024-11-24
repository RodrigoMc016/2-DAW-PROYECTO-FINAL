import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pfc/components/login-component/login-component';
import { AccountComponent } from './pfc/components/account-component/account-component';
import { adminComponent } from './pfc/components/admin/admin-component';
import { UserComponent } from './pfc/components/user/user-component';
import { homeAdminComponent } from './pfc/components/admin/shared/admin-home-component/admin-home-component';
import { homeUserComponent } from './pfc/components/user/shared/home-user-component/home-user-component';
import { MenuComponent } from './pfc/components/user/shared/menu-component/menu-component';
import { ContactComponent } from './pfc/components/user/shared/contact-component/contact-component';
import {  ProfileNavComponent } from './pfc/components/user/shared/profileNav-component/profileNav-component';
import {  userDataComponent } from './pfc/components/user/shared/userData-component/userData-component';
import { mailComponent } from './pfc/components/admin/shared/mail-component/mail-component';
import { promoComponent } from './pfc/components/admin/shared/promo-component/promo-component';
import { adminProfileComponent } from './pfc/components/admin/shared/admin-profile-component/admin-profile-component';
import { adminMenuComponent } from './pfc/components/admin/shared/admin-menu-component/admin-menu-component';
import { paymentConfirmedComponent } from './pfc/components/user/shared/payment-confirmed/payment.component';
import { historyComponent } from './pfc/components/user/shared/history-component/history-component';
import { friendsComponent } from './pfc/components/user/shared/friends-list-component/friends-list-component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'crea-tu-cuenta', component: AccountComponent },


  {path:'TimelessFlavour-admin', component: adminComponent, children:[
    {path:'home-admin', component: homeAdminComponent},
    {path:'menu-admin', component:adminMenuComponent},
    {path:'mail', component: mailComponent},
    {path:'promos', component:promoComponent},
    {path:'mi-perfil-admin', component:adminProfileComponent},

  ]},

  {path:'TimelessFlavour', component:UserComponent, children:[
    {path:'home', component:homeUserComponent},
    {path:'menu', component:MenuComponent },

    {path:'contacto', component:ContactComponent},
    {path:'mi-perfil', component:ProfileNavComponent, children:[
      {path:'mis-datos', component:userDataComponent},
      {path:'mis-movimientos', component:historyComponent},
      {path:'amigos', component:friendsComponent},
      {path:'mis-promociones', component:promoComponent},

    ]},


  ]},
  {path:'pago-realizado', component:paymentConfirmedComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

