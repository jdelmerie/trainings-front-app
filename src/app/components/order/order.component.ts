import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
})
export class OrderComponent implements OnInit {
  dateOrder: Date = new Date();
  constructor(public cartService: CartService, private router: Router) {}

  ngOnInit(): void {}

  onUpdateCustomer(){
    this.router.navigateByUrl('customer');
  }

  onOrder() {
    if (confirm("Aujourd'hui c'est gratuit, merci de votre visite !")) {
      this.cartService.clear();
      this.router.navigateByUrl('');
    }
  }
}
