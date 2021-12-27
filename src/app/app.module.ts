import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomePageComponent } from './home-page/home-page.component';
import { StorePageComponent } from './store-page/store-page.component';
import { CartPageComponent } from './cart-page/cart-page.component';
import { BookComponent } from './book/book.component';
import { BookDetailComponent } from './book-detail/book-detail.component';
import { PageDevelopingComponent } from './page-developing/page-developing.component';
import { SearchFieldComponent } from './search-field/search-field.component';
import { SortComponent } from './sort/sort.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { AuthPageComponent } from './auth-page/auth-page.component';
import { AuthGuard } from './shared/auth.guard';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomePageComponent,
    StorePageComponent,
    CartPageComponent,
    BookComponent,
    BookDetailComponent,
    PageDevelopingComponent,
    SearchFieldComponent,
    SortComponent,
    RegisterPageComponent,
    AuthPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
