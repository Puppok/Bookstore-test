import { AuthPageComponent } from './auth-page/auth-page.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookDetailComponent } from './book-detail/book-detail.component';
import { CartPageComponent } from './cart-page/cart-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { PageDevelopingComponent } from './page-developing/page-developing.component';
import { StorePageComponent } from './store-page/store-page.component';
import { AuthGuard } from './shared/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomePageComponent },
  { path: 'store', component: StorePageComponent, canActivate: [AuthGuard] },
  { path: 'store/:id', component: BookDetailComponent, canActivate: [AuthGuard] },
  { path: 'cart', component: CartPageComponent, canActivate: [AuthGuard] },
  { path: 'order', component: PageDevelopingComponent, canActivate: [AuthGuard] },
  { path: 'register', component: RegisterPageComponent },
  { path: 'auth', component: AuthPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
