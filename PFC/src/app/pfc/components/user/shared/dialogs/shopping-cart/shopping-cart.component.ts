import { Component } from '@angular/core';
import { CartService } from '../../../../../services/cart.service';
import { Product } from '../../../../../interfaces/products.interface';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'carrito',
  templateUrl: 'shopping-cart.component.html',
  styleUrl:'shopping-cart.component.scss',
  standalone:true,
  imports:[
    NgIf,
    NgFor
  ]
})

export class shoppingCartComponent  {
  cartItems: { product: Product; ammount: number }[] = [];
  totalPrice: number = 0;
  totalPoints: number = 0;
  pointsEarned: number = 0;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.updateCart();
  }

  //Actualizar el carrito con informacion de los totales y cambio del numero de elementos al lado del icono
  updateCart(): void {
    this.cartItems = this.cartService.getItems();
    this.totalPrice = this.cartService.getTotalPrice();
    this.totalPoints = this.cartService.getTotalPoints();
    this.pointsEarned = this.cartService.getPointsEarned();
  }

  //Método para incrementar elementos (cantidad)

  incrementQuantity(productId: number): void {
    const product = this.cartItems.find((item) => item.product.id === productId);
    if (product) {
      this.cartService.addItem(product.product);
      this.updateCart();
    }
  }

  //Metodo para quitar elementos
  decrementQuantity(productId: number): void {
    this.cartService.removeItem(productId);
    this.updateCart();
  }
}

