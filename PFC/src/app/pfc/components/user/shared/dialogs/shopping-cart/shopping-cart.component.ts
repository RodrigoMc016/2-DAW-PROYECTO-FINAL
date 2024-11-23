import { RedirectToCheckoutOptions } from './../../../../../../../../node_modules/@stripe/stripe-js/dist/stripe-js/hosted-checkout.d';
import { ChangeDetectorRef, Component, NgModule } from '@angular/core';
import { CartService } from '../../../../../services/cart.service';
import { Product } from '../../../../../interfaces/products.interface';
import { NgFor, NgIf } from '@angular/common';
import { AuthService } from '../../../../../services/auth.service';
import { loadStripe, Stripe } from '@stripe/stripe-js'
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { FormsModule, NgModel } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'carrito',
  templateUrl: 'shopping-cart.component.html',
  styleUrl: 'shopping-cart.component.scss',
  standalone: true,
  imports: [
    NgIf,
    NgFor,
    MatFormField,
    MatLabel,
    MatError,
    FormsModule,
    MatInputModule


  ]
})

export class shoppingCartComponent {




  // Variable stripe como instancia de Stripe
  stripe: Stripe | null = null;
  saldo: number = 0;
  cartItems: { product: Product; ammount: number }[] = [];
  totalPrice: number = 0;
  totalPoints: number = 0;
  pointsEarned: number = 0;
  address: string = "";

  constructor(private cartService: CartService, private authService: AuthService, private cdr: ChangeDetectorRef) { }

  async ngOnInit(): Promise<void> {
    //Load stripe devuelve una promesa, y para ello hay que
    // cargar Stripe de forma asincrónica ya que al no estar lista stripe:Stripe, no estará disponible inmediatamente
    //por lo que se espera a que primero se resuelva para luego usar este objeto.
    //Clave pública de stripe
    try {
      console.log('Cargando Stripe...');
      this.stripe = await loadStripe('pk_test_51QO2bhLLsR8hkmPmACseaCCUAvHnlHhnTnQ0OxnhpnjUnsKpbK6QTHJdseTbyyRZQtltzm7ziuHDRYI8t33dr0n200x9wciWuf');
      console.log('Stripe cargado:', this.stripe);

      this.updateCart();
      console.log('Puntos totales:', this.totalPoints);

      this.saldo = this.authService.getBalance();
      const saldoPuntos = this.pointsEarned;
      this.saldo += saldoPuntos;

      console.log('Saldo calculado:', this.saldo);
    } catch (error) {
      console.error('Error cargando Stripe:', error);
    }
  }

  // Actualizar el carrito con información de los totales
  updateCart(): void {
    this.cartItems = this.cartService.getItems();
    this.totalPrice = this.cartService.getTotalPrice();
    this.totalPoints = this.cartService.getTotalPoints();
    this.pointsEarned = this.cartService.getPointsEarned();
    // console.log('Carrito actualizado:', this.cartItems);
    // console.log('Puntos totales:', this.totalPoints);
  }

  // Método para incrementar cantidad de un producto
  incrementQuantity(productId: number): void {
    const product = this.cartItems.find((item) => item.product.id === productId);
    if (product) {
      this.cartService.addItem(product.product);
      this.updateCart();
    }
  }

  // Método para disminuir cantidad de un producto
  decrementQuantity(productId: number): void {
    this.cartService.removeItem(productId);
    this.updateCart();
  }

  checkout(): void {
    const cartItems = this.cartService.getItems();
    const totalPrice = this.cartService.getTotalPrice();
    const totalPoints = this.cartService.getPointsEarned();
    const userData = this.authService.getUserData();  // Obtener los datos del usuario
    const email = userData?.email;
    const address = this.address;

    console.log('User email:', email);
    console.log('Total Points:', totalPoints);
    console.log('Total Price:', totalPrice);
    console.log('Dirección:', address);

    // Verifica que tanto el email como la dirección estén presentes
    if (email && address.trim() !== '') {
      // Llamada al backend para crear la sesión de pago
      this.authService.createCheckoutSession(cartItems, totalPrice, address).subscribe(
        (response: any) => {
          if (response.id && this.stripe) {
            console.log('id' , response.id);
            // Enviar el ID del usuario y los puntos ganados como parte de la sesión de pago
            this.authService.updateBalance(email, totalPoints).subscribe(
              (updateResponse: any) => {
                console.log('Balance actualizado:', updateResponse);
                // Redirigir a Stripe Checkout con el sessionId devuelto desde el backend
                this.stripe?.redirectToCheckout({ sessionId: response.id }).then((result: any) => {
                  if (result.error) {
                    console.log('Error al redirigir a Checkout:', result.error.message);
                  }
                });
              },
              (error) => {
                console.error('Error al actualizar el balance:', error);
              }
            );
          } else {
            console.error('No se recibió un ID de sesión de pago válido');
          }
        },
        (error) => {
          console.error('Error al crear la sesión de pago:', error);
        }
      );
    } else {
      console.error('El usuario no está logueado o la dirección está vacía');
    }
  }


}


