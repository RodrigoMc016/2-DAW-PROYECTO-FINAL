import { Component, OnInit } from '@angular/core';
import { MatToolbar } from '@angular/material/toolbar';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { CartService } from '../../../../services/cart.service';
import { NgIf } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { shoppingCartComponent } from '../dialogs/shopping-cart/shopping-cart.component';
import { Product } from '../../../../interfaces/products.interface';
import { AuthService } from '../../../../services/auth.service';

@Component({
  selector: 'navBarUser',
  templateUrl: 'navigation-component.html',
  styleUrl: 'navigation-component.scss',
  standalone: true,
  imports: [
    RouterLink,
    MatToolbar,
    NgIf
  ]

})

export class navigationComponent {

  //Inicializar variables usuario y saldo
  saldo: number = 0;
  email: string = "";


  //Inicializar el total de items que tendrá el carrito
  totalCartItems: number = 0;


  constructor(private router: Router, private cartService: CartService, private dialog: MatDialog, private authService: AuthService) { }

  openCartModal(): void {
    this.dialog.open(shoppingCartComponent, {
      width: '500px',
    });
  }

  //Método para volver a la página del login
  volverALogin() {
    this.router.navigate(['/login']);
  }


  //Obtener los datos del usuario logueado en la sesión
  ngOnInit(): void {
    const userData = this.authService.getUserData();

    if (userData) {
      this.saldo = userData.balance;  // Obtener saldo
      this.email = userData.email;  // Obtener email
      this.getSaldo();

    }

    this.updateCartNumber();




  }

  // Verifica y actualiza el carrito cada vez que Angular verifica el componente y que han habido cambios en el componente
  ngDoCheck(): void {
    this.updateCartNumber();
  }

  //Método para actualizar el número de items del carrito
  updateCartNumber(): void {
    const newCartItems = this.cartService.getItemsNumber();
    if (newCartItems !== this.totalCartItems) {  // Solo actualizar si ha cambiado el número
      this.totalCartItems = newCartItems;

    }
   
  }


  //Incrementar el número de elementos en el carrito y por tanto, al lado del icono propio
  addToCart(product: Product): void {

    this.cartService.addItem(product);
    this.updateCartNumber();
  }

  //Eliminar un elemento del carrito por medio de la id y por tanto disminuir el número anterior
  removeFromCart(productId: number): void {

    this.cartService.removeItem(productId);
    this.updateCartNumber();
  }

  getSaldo(): void {

    // Aseguramos que el email no sea vacío o undefined
    if (!this.email) {
      console.error('Email no encontrado en los datos del usuario');
      return; // Si no hay email, salimos de la función sin hacer la solicitud
    } else {
      // Usamos el método getSaldo de AuthService
      this.authService.getSaldo(this.email).subscribe(
        (response) => {
          if (response.success) {
            this.saldo = response.saldo;  // Si la respuesta es exitosa, asignamos el saldo
          } else {
            console.error('Error al obtener el saldo:', response.error);
          }
        },
        (error) => {
          console.error('Error en la solicitud HTTP:', error);
        }
      );
    }
  }


}



