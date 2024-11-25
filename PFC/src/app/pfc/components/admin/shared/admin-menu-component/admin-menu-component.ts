import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { Product } from '../../../../interfaces/products.interface';
import { AuthService } from '../../../../services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {  adminDialogComponent } from '../dialogs/adminDialog.component';

@Component({
  selector: 'admin-menu',
  templateUrl: 'admin-menu-component.html',
  styleUrl:'admin-menu-component.scss',
  standalone:true,
  imports:[
    NgIf,
    NgFor,
    CommonModule,
    ReactiveFormsModule
  ]
})

export class adminMenuComponent  {
  productsResult: { [category: string]: Product[] } = {}; //array de productos por categoría con clave categoria, usando el modelo de la interfaz para guardar los datos
  productForm: FormGroup;
  message:string = "";

  constructor(private authService: AuthService, private dialog: MatDialog, private fb:FormBuilder) {
     // Inicializar el formulario
     this.productForm = this.fb.group({
      name: ['', Validators.required],
      price_real: ['', [Validators.required, Validators.min(0)]],
      price_points: ['', [Validators.required, Validators.min(0)]],
      category_id: ['', Validators.required],
      description: ['', Validators.required],
      image_url: [''], // Opcional
    });
   }





  loadProducts(): void {
    this.authService.mostrarMenu().subscribe(
      (data) => {

        this.productsResult = data; //asigna lo que de el json a productsResult
      },
      (error) => {
        console.log("Error");
      }
    )
  }

  //Cargar la funcion nada mas inicializar el componente
  ngOnInit(): void {

    this.loadProducts();
  }

  //Desplazamiento del submenú
  goToCategory(category: string): void {
   //Pora asegurar que no hay fallos pasar todas las categorías a mayúscula como en la base de datos
    const categoryId = category.toUpperCase();

    // Buscar el elemento correspondiente al id de la categoría en la página
    const element = document.getElementById(categoryId);

    // Si el elemento existe, desplazamiento suave hasta el ancla seleccionado
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }

  }

   // Método para abrir el diálogo
   openDialog(message: string): void {
    const dialogRef = this.dialog.open(adminDialogComponent, {
      data: {
        title: 'Resultado de la eliminación',
        message: message,
      },
    });

    // Manejar la acción cuando se cierre el diálogo
    dialogRef.afterClosed().subscribe(() => {
     
    });
  }

  onSubmit(): void {
    if (this.productForm.valid) {
      this.authService.addProduct(this.productForm.value).subscribe({
        next: (res) => {
          this.message = 'Producto agregado exitosamente';
          this.productForm.reset(); // Limpiar el formulario tras el envío exitoso
        },
        error: (err) => {
          this.message = 'Error al agregar el producto: ' + err.error?.error || 'Error desconocido';
        },
      });
    } else {
      this.message = 'Por favor, completa todos los campos obligatorios.';
    }
  }

  // Método para eliminar un producto
  deleteProduct(productId: number): void {
    if (confirm("¿Estás seguro de que deseas eliminar este producto?")) {
      this.authService.deleteProduct(productId).subscribe({
        next: (res) => {
          // Mostrar el mensaje en el diálogo si la eliminación es exitosa
          this.openDialog('Producto eliminado correctamente');
          this.loadProducts(); // Recargar productos después de la eliminación
        },
        error: (err) => {
          // Mostrar el mensaje de error en el diálogo
          this.openDialog('Error al eliminar el producto: ' + err.error?.error || 'Error desconocido');
        }
      });
    }
  }

}
