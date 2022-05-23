import { Injectable } from '@angular/core';

import { Training } from 'src/app/model/training'; // import de la class

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cart: Training[] = [];

  constructor() {}

  //add item to cart
  addTraining(training: Training) {
    this.cart.push(training);
  }

  //delete item from cart
  removeTraining(id: number) {
    let objToRemove = this.cart.find((training) => {
      return training.id == id;
    });

    if (objToRemove != null) {
      if (objToRemove.quantity == 1) {
        this.cart.splice(this.cart.indexOf(objToRemove, 1));
      } else {
        objToRemove.quantity = objToRemove.quantity - 1;
      }
    }
  }

  //return cart
  getCart() {
    return this.cart;
  }

  //return total amount
  getTotalAmount() {
    let total = 0;
    for (let item of this.cart) {
      total += item.price * item.quantity;
    }
    return total;
  }
}
