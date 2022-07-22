import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Customer } from 'src/app/model/customer';
import { Order } from 'src/app/model/order';
import { CartService } from 'src/app/services/cart.service';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
})
export class OrderComponent implements OnInit {
  dateOrder: Date = new Date();
  order: Order | undefined;
  customer: Customer | undefined;
  error = null;
  confirmationNumber:number = 0;

  constructor(
    public cartService: CartService,
    private router: Router,
    private orderService: OrderService
  ) {}

  ngOnInit(): void {}

  onUpdateCustomer() {
    this.router.navigateByUrl('customer');
  }

  onOrder() {
    if (confirm("Aujourd'hui c'est gratuit, merci de votre visite !")) {
      this.customer = this.cartService.getCustomer();
      this.order = new Order(0,this.dateOrder.getTime(),this.cartService.getTotalAmount(),  this.customer, 0);
      this.addOrder(this.order); //add order + customer db 
      this.cartService.clear();
      this.router.navigateByUrl('/order');
    }
  }

  addOrder(order: Order) {
    this.orderService.addOrder(order).subscribe({
      next: (data) => (this.confirmationNumber = data.number),
      error: (err) => (this.error = err.message),
      complete: () => console.log('COMMANDE CONFIRM : ' + this.confirmationNumber),
    });
  }
}
