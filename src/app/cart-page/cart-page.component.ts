import { CartService } from './../shared/cart.service';
import { Component } from '@angular/core';
@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.scss']
})
export class CartPageComponent {

  constructor(readonly cartService: CartService) { }

}
