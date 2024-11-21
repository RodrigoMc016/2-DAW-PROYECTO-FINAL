import { Component, OnInit } from '@angular/core';
import { MatToolbar } from '@angular/material/toolbar';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { CartService } from '../../../../services/cart.service';
import { NgIf } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { shoppingCartComponent } from '../dialogs/shopping-cart/shopping-cart.component';
import { Product } from '../../../../interfaces/products.interface';

@Component({
  selector: 'navBarUser',
  templateUrl: 'navigation-component.html',
  styleUrl: 'navigation-component.scss',
  standalone: true,
  imports:[
    RouterLink,
    MatToolbar,
    NgIf
  ]

})

export class navigationComponent {

  //Inicializar el total de items que tendrá el carrito
  totalCartItems :number= 0;
  constructor(private router:Router, private cartService:CartService, private dialog:MatDialog) { }

  openCartModal(): void {
    this.dialog.open(shoppingCartComponent, {
      width: '500px',
    });
  }

  //Método para volver a la página del login
  volverALogin(){
    this.router.navigate(['/login']);
  }


  //Hacer que se ejecute al iniciar la página
  ngOnInit():void {
    console.log('ngOnInit ejecutado');
    this.updateCartNumber();




  }

  ngDoCheck(): void {
    this.updateCartNumber();  // Verifica y actualiza cada vez que Angular verifica el componente
  }

  //Método para actualizar el número de items del carrito
    updateCartNumber():void{
      const newCartItems = this.cartService.getItemsNumber();
      if (newCartItems !== this.totalCartItems) {  // Solo actualizar si ha cambiado el número
        this.totalCartItems = newCartItems;
        console.log('Actualizando totalCartItems:', this.totalCartItems);
      }
      console.log('Actualizando totalCartItems:', this.totalCartItems);
    }


  //Incrementar el número de elementos en el carrito y por tanto, al lado del icono propio
  addToCart(product:Product):void{
    console.log('Añadiendo producto al carrito:', product);
    this.cartService.addItem(product);
    this.updateCartNumber();
  }

  //Eliminar un elemento del carrito por medio de la id y por tanto disminuir el número anterior
  removeFromCart(productId:number):void{
     console.log('Eliminando producto del carrito con ID:', productId);
    this.cartService.removeItem(productId);
    this.updateCartNumber();
  }



}
