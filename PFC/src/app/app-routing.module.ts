import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pfc/components/login-component/login-component';
import { AccountComponent } from './pfc/components/account-component/account-component';
import { adminComponent } from './pfc/components/admin/admin-component';
import { UserComponent } from './pfc/components/user/user-component';
import { homeAdminComponent } from './pfc/components/admin/shared/admin-home-component/admin-home-component';
import { homeUserComponent } from './pfc/components/user/shared/home-user-component/home-user-component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'crea-tu-cuenta', component: AccountComponent },
  { path: '**', redirectTo: 'login' },

  {path:'TimelessFlavour-admin', component: adminComponent, children:[
    {path:'home', component: homeAdminComponent}
  ]},

  {path:'TimelessFlavour', component:UserComponent, children:[
    {path:'home', component:homeUserComponent}
  ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

