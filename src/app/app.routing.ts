import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './shared/services/auth.guard';
import {
  FullLayoutComponent,
  SimpleLayoutComponent
} from './containers';
import { ChangepasswordComponent } from './views/change-password/change-password.component';
export const routes: Routes = [
  {
    path: '', redirectTo: 'login', pathMatch: 'full'
  },
  {
    path: 'login', component: SimpleLayoutComponent,
    data: {
      title: ''
    },
    children: [{
      path: '',
      loadChildren: './views/login/login.module#LoginModule'
    }]
  },
  {
    path: 'logout',
    component: SimpleLayoutComponent,
    data: {
      title: ''
    },
    children: [{
      path: '',
      loadChildren: './views/logout/logout.module#LogoutModule'
    }]
  },

  {
    path: '',
    component: FullLayoutComponent,
    canActivate: [AuthGuard],
    data: {
      title: '主页'
    },
    children: [
      {
        path: 'custom',
        loadChildren: './views/custom/custom.module#CustomModule',

      }, {
        path: 'product',
        loadChildren: './views/product/product.module#ProductModule'
      }, {
        path: 'shop',
        canActivate: [AuthGuard],
        loadChildren: './views/shop/shop.module#ShopModule'
      }, {
        path: 'team',
        canActivate: [AuthGuard],
        loadChildren: './views/team/team.module#TeamModule'
      }, {
        path: 'user',
        canActivate: [AuthGuard],
        loadChildren: './views/user/user.module#UserModule'
      }, {
        path: 'department',
        canActivate: [AuthGuard],
        loadChildren: './views/department/department.module#DepartmentModule'
      },
      {
        path: 'change-password',
        canActivate: [AuthGuard],
        loadChildren: './views/change-password/change-password.module#ChangePasswordModule'
        //  loadChildren: './views/department/department.module#DepartmentModule'
      },
      {
        path: 'profile',
        canActivate: [AuthGuard],
        loadChildren: './views/profile/profile.module#ProfileModule'
      },
    ]
  },
  {
    path: '**',
    component: SimpleLayoutComponent,
    data: {
      title: ''
    },
    children: [{
      path: '',
      loadChildren: './views/404/404.module#_404Module'
    }]
  }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
