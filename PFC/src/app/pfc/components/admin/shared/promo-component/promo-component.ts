import { Component } from '@angular/core';
import { AuthService } from '../../../../services/auth.service';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'admin-promos',
  templateUrl: 'promo-component.html',
  styleUrl: 'promo-component.scss',
  standalone: true,
  imports: [
    NgFor,
    FormsModule,
    NgIf

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
  errorMessage:string ="";
  constructor(private authService: AuthService) { }
  ngOnInit(): void {
    this.loadPromoCodes();
  }

  loadPromoCodes(): void {
    this.authService.getPromos().subscribe({
      next: (data) => {
        this.promoCodes = data;
        console.log('Códigos promocionales obtenidos:', this.promoCodes);
      },
      error: (err) => {
        this.errorMessage = 'Error al obtener los códigos promocionales';
        console.error(this.errorMessage, err);
      }
    });
  }


  createPromoCode(): void {
    this.authService.addPromos(this.newPromoCode).subscribe(
      () => {
        alert('Código promocional creado exitosamente.');
        this.newPromoCode = { code: '', discount: 0, product_id: null, category_name: null };
        this.loadPromoCodes();
      },
      (error) => {
        console.error('Error creating promo code:', error);
      }
    );
  }

  updatePromoCode(code: string): void {
    this.authService.updatePromo(code).subscribe(
      () => {
        alert('Código promocional desactivado exitosamente.');
        this.loadPromoCodes();
      },
      (error) => {
        console.error('Error deactivating promo code:', error);
      }
    );
  }


  deletePromoCode(code: string): void {
    const confirmDelete = confirm(`¿Estás seguro de que deseas borrar el código promocional "${code}"?`);
    if (confirmDelete) {
      this.authService.deletePromo(code).subscribe(
        () => {
          alert('Código promocional borrado exitosamente.');
          this.loadPromoCodes();
        },
        (error) => {
          console.error('Error deleting promo code:', error);
        }
      );
    }
  }
}





