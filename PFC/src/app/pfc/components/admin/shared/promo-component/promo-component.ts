import { Component } from '@angular/core';
import { AuthService } from '../../../../services/auth.service';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { confirmationDialogComponent } from '../../../user/shared/dialogs/confirmation/confirmation-dialog.component';

@Component({
  selector: 'admin-promos',
  templateUrl: 'promo-component.html',
  styleUrl: 'promo-component.scss',
  standalone: true,
  imports: [
    NgFor,
    FormsModule,
    NgIf,
    confirmationDialogComponent

  ]

})

export class promoComponent {

  promoCodes: any[] = [];
  newPromoCode = {
    code: '',
    discount: 0,
    product_id: null,
    category_name: null,
  };
  errorMessage: string = "";
  constructor(private authService: AuthService, public dialog: MatDialog) { }
  ngOnInit(): void {
    this.loadPromoCodes();
  }

  //Cargar los codigos de promocion y mostrarlos en las tablas
  loadPromoCodes(): void {
    this.authService.getPromos().subscribe({
      next: (data) => {
        this.promoCodes = data;

      }

    });
  }

  //Creacion de codigo de promocion
  createPromoCode(): void {
    this.authService.addPromos(this.newPromoCode).subscribe(
      () => {
        this.dialog.open(confirmationDialogComponent, {
          data: {
            message: 'Código promocional creado exitosamente.'
          }
        });
        this.newPromoCode = { code: '', discount: 0, product_id: null, category_name: null };
        this.loadPromoCodes();
      },
      () => {
        this.dialog.open(confirmationDialogComponent, {
          data: {
            message: 'Ha ocurrido un error al crear el código de promoción.'
          }
        });
      }
    );
  }

  //Desactivación de codigos de promocion
  updatePromoCode(code: string): void {
    this.authService.updatePromo(code).subscribe(
      () => {
        this.dialog.open(confirmationDialogComponent, {
          data: {
            message: 'Código promocional desactivado exitosamente.'
          }
          });
        this.loadPromoCodes();
      },
      () => {
        this.dialog.open(confirmationDialogComponent, {
          data: {
            message: 'Error al desactivar el código promocional.'
          }
          });
      }
    );
  }

   //Activación de codigos de promoción
  // activatePromoCode(code: string): void {
  //   this.authService.activatePromo(code).subscribe(
  //     () => {
  //       this.dialog.open(confirmationDialogComponent, {
  //         data: {
  //           message: 'Código promocional reactivado exitosamente.'
  //         }
  //       });
  //       this.loadPromoCodes();
  //     },
  //     () => {
  //       this.dialog.open(confirmationDialogComponent, {
  //         data: {
  //           message: 'Error al reactivar el código promocional.'
  //         }
  //       });
  //     }
  //   );
  // }

  //Borrado de códigos de promocion
  deletePromoCode(code: string): void {
    const message= confirm(`¿Estás seguro de que deseas borrar el código promocional "${code}"?`); //comprueba si el resultado es true y si lo es borra el codigo
    if (message) {
      this.authService.deletePromo(code).subscribe(
        () => {
                this.dialog.open(confirmationDialogComponent, {
            data: {
              message: 'Código promocional borrado exitosamente.'
            }
            });
          this.loadPromoCodes();
        },

      );
    } else {
      this.dialog.open(confirmationDialogComponent, {
        data: {
          message: 'Error al borrar el código promocional.'
        }
      });
    }
  }
}





