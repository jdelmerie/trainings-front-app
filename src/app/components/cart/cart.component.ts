import { Component, OnInit } from '@angular/core';
import { Training } from 'src/app/model/training'; // import de la class
import { CartService } from 'src/app/services/cart.service'; //import de la dépendance

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  cart: Training[] | undefined;
  total: number = 0;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cart = this.cartService.getCart();
    this.displayTotal(); 
  }

  delete(training: Training) {
    this.cartService.removeTraining(training.id);
    this.cart = this.cartService.getCart();
    this.displayTotal();
  }

  displayTotal() {
    this.total = this.cartService.getTotalAmount();
    return this.total;
  }
}
