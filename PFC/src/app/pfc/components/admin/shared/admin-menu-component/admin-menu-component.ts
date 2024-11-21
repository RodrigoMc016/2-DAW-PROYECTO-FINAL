import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { Product } from '../../../../interfaces/products.interface';
import { AuthService } from '../../../../services/auth.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'admin-menu',
  templateUrl: 'admin-menu-component.html',
  styleUrl:'admin-menu-component.scss',
  standalone:true,
  imports:[
    NgIf,
    NgFor,
    CommonModule
  ]
})

export class adminMenuComponent  {
  productsResult: { [category: string]: Product[] } = {}; //array de productos por categoría con clave categoria, usando el modelo de la interfaz para guardar los datos


  constructor(private authService: AuthService, private dialog: MatDialog) { }





  loadProducts(): void {
    this.authService.mostrarMenu().subscribe(
      (data) => {
        console.log(data);
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

  goToCategory(category: string): void {
   //Pora asegurar que no hay fallos pasar todas las categorías a mayúscula como en la base de datos
    const categoryId = category.toUpperCase();

    // Buscar el elemento correspondiente al id de la categoría en la página
    const element = document.getElementById(categoryId);

    // Si el elemento existe, desplazamiento suave hasta el ancla seleccionado
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else {
      console.log(`No se encontró la categoría ${categoryId}`);
    }
  }


}
