import { RedirectToCheckoutOptions } from './../../../../../../../../node_modules/@stripe/stripe-js/dist/stripe-js/hosted-checkout.d';
import { Component } from '@angular/core';
import { CartService } from '../../../../../services/cart.service';
import { Product } from '../../../../../interfaces/products.interface';
import { NgFor, NgIf } from '@angular/common';
import { AuthService } from '../../../../../services/auth.service';
import{loadStripe, Stripe} from '@stripe/stripe-js'

@Component({
  selector: 'carrito',
  templateUrl: 'shopping-cart.component.html',
  styleUrl:'shopping-cart.component.scss',
  standalone:true,
  imports:[
    NgIf,
    NgFor,

  ]
})

export class shoppingCartComponent  {






  // Variable stripe como instancia de Stripe
  stripe: Stripe | null = null;

  cartItems: { product: Product; ammount: number }[] = [];
  totalPrice: number = 0;
  totalPoints: number = 0;
  pointsEarned: number = 0;

  constructor(private cartService: CartService, private authService: AuthService) {}

  async ngOnInit(): Promise<void> {
    //Load stripe devuelve una promesa, y para ello hay que
    // cargar Stripe de forma asincrónica ya que al no estar lista stripe:Stripe, no estará disponible inmediatamente
    //por lo que se espera a que primero se resuelva para luego usar este objeto.
    //Clave pública de stripe
    this.stripe = await loadStripe('pk_test_51QO2bhLLsR8hkmPmACseaCCUAvHnlHhnTnQ0OxnhpnjUnsKpbK6QTHJdseTbyyRZQtltzm7ziuHDRYI8t33dr0n200x9wciWuf');
    this.updateCart();

  }

  // Actualizar el carrito con información de los totales
  updateCart(): void {
    this.cartItems = this.cartService.getItems();
    this.totalPrice = this.cartService.getTotalPrice();
    this.totalPoints = this.cartService.getTotalPoints();
    this.pointsEarned = this.cartService.getPointsEarned();
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

  // Método para realizar el checkout
  checkout(): void {
    const cartItems = this.cartService.getItems();
    const totalPrice = this.cartService.getTotalPrice();

    // Llamada al backend para crear la sesión de pago
    this.authService.createCheckoutSession(cartItems, totalPrice).subscribe(
      (response: any) => {
        if (response.id && this.stripe) {
          // Redirigir al usuario a Stripe Checkout
          this.stripe.redirectToCheckout({ sessionId: response.id }).then((result: any) => {
            if (result.error) {
              console.log('Error al redirigir a Checkout:', result.error.message);
            }
          });
        }
      },
      (error) => {
        console.error('Error al crear la sesión de pago:', error);
      }
    );
  }
}



