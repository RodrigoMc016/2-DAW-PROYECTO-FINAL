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
import { ProfileComponent } from './pfc/components/user/shared/profile-component/profile-component';
import { OrderComponent } from './pfc/components/user/shared/order-component/order-component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'crea-tu-cuenta', component: AccountComponent },


  {path:'TimelessFlavour-admin', component: adminComponent, children:[
    {path:'home-admin', component: homeAdminComponent}
  ]},

  {path:'TimelessFlavour', component:UserComponent, children:[
    {path:'home', component:homeUserComponent},
    {path:'menu', component:MenuComponent},
    {path:'contacto', component:ContactComponent},
    {path:'mi-perfil', component:ProfileComponent},
    {path:'mi-pedido', component:OrderComponent}
  ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

