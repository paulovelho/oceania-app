import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EntrancePage } from './entrance.page';
import { LoginPage } from './login.page';

const routes: Routes = [
  {
    path: '',
    component: LoginPage
  },
  {
    path: 'entrance',
    component: EntrancePage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginPageRoutingModule {}
