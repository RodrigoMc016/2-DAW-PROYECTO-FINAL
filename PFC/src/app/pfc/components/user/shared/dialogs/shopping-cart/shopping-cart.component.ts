
import { Component, NgModule } from '@angular/core';
import { CartService } from '../../../../../services/cart.service';
import { Product } from '../../../../../interfaces/products.interface';
import { NgFor, NgIf } from '@angular/common';
import { AuthService } from '../../../../../services/auth.service';
import { loadStripe, Stripe } from '@stripe/stripe-js'
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { FormsModule, NgModel } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { catchError, of } from 'rxjs';
import { DialogRef } from '@angular/cdk/dialog';
import { confirmationDialogComponent } from '../confirmation/confirmation-dialog.component';
import { MatDialog } from '@angular/material/dialog';

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
    MatInputModule,
    confirmationDialogComponent


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
  code: string = "";
  message: string = "";
  errorMessage: string = "";


  constructor(private cartService: CartService, private authService: AuthService, public dialog: MatDialog) { }

  async ngOnInit(): Promise<void> {
    //Load stripe devuelve una promesa, y para ello hay que
    // cargar Stripe de forma asincrónica ya que al no estar lista stripe:Stripe, no estará disponible inmediatamente
    //por lo que se espera a que primero se resuelva para luego usar este objeto.



    //Clave pública de strippe
    this.stripe = await loadStripe('pk_test_51QO2bhLLsR8hkmPmACseaCCUAvHnlHhnTnQ0OxnhpnjUnsKpbK6QTHJdseTbyyRZQtltzm7ziuHDRYI8t33dr0n200x9wciWuf');


    this.updateCart();


    this.saldo = this.authService.getBalance();
    const saldoPuntos = this.pointsEarned;
    this.saldo += saldoPuntos;


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

  checkout(): void {
    const cartItems = this.cartService.getItems();
    const totalPrice = this.cartService.getTotalPrice();
    const totalPoints = this.cartService.getPointsEarned();
    const userData = this.authService.getUserData();  // Obtener los datos del usuario
    const email = userData?.email; //sacar el email
    const address = this.address;



    // Verifica que tanto el email como la dirección estén presentes
    if (address.trim() !== '') {
      // Llamada al backend para crear la sesión de pago
      this.authService.createCheckoutSession(email, cartItems, totalPrice, address).subscribe(
        (response: any) => {
          if (response.id && this.stripe) {

            // Enviar el ID del usuario y los puntos ganados como parte de la sesión de pago
            this.authService.updateBalance(email, totalPoints).subscribe(
              (result: any) => {

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
  checkoutPoints(): void {
    const cartItems = this.cartService.getItems();
    const userData = this.authService.getUserData();  // Obtener los datos del usuario
    const totalPoints = this.totalPoints;  // Total de puntos del carrito
    const address = this.address;  // Dirección ingresada por el usuario
    const email = userData?.email;
    const saldo = this.saldo;





    this.authService.createCheckoutPoints(email, cartItems, totalPoints, address).subscribe(
      (response: any) => {

        // Verifica que la respuesta esté en el formato esperado
        if (response && response.success) {


          this.dialog.open(confirmationDialogComponent, {
            data: {
              message: 'Compra realizada exitosamente.'
            }
          }).afterClosed().subscribe(() => {
            this.cartService.clearCart();
            this.updateCart();
            window.location.reload();
          });

        } else {
          this.dialog.open(confirmationDialogComponent, {
            data: {
              message: 'Ha ocurrido un error durante la compra, vuelva a intentarlo.'
            }
          });
        }
      }
    );
  }

  //Método para aplicar el descuento calculado al item/s seleccionados
  applyPromoCode(): void {
    this.authService.applyPromo(this.code).subscribe({
      next: (res) => {
        if (res.success) {
          // Actualizar precios de los productos escogidos
          res.updated_products.forEach((updatedProduct: { id: number; discounted_price: number | undefined; }) => {
            const product = this.cartItems.find(item => item.product.id === updatedProduct.id);
            //Si existe el producto se le aplica el descuento añadiendole el valor
            if (product) {
              product.product.discounted_price = updatedProduct.discounted_price;
            }
          });

          // Actualizar el carrito y recalcular totales
          this.updateCart();
        } else {
          this.errorMessage = res.error || 'Error desconocido';
          console.error('Error al aplicar el código promocional:', res.error);
        }
      },
      error: () => {
        this.errorMessage = 'Error al aplicar el código promocional.';
        console.error('Error al aplicar el código promocional');
      }
    });
  }

}









