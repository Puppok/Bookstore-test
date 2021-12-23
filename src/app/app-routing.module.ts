import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartPageComponent } from './cart-page/cart-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { PageDevelopingComponent } from './page-developing/page-developing.component';
import { StorePageComponent } from './store-page/store-page.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomePageComponent },
  { path: 'store', component: StorePageComponent },
  { path: 'cart', component: CartPageComponent },
  { path: 'order', component: PageDevelopingComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
