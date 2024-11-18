import { Component } from '@angular/core';
import { AuthService } from '../../../../services/auth.service';
import {Product} from '../../../../interfaces/products.interface';
import { CommonModule, NgFor } from '@angular/common';

@Component({
  selector: 'menu',
  templateUrl: 'menu-component.html',
  styleUrl: 'menu-component.scss',
  standalone: true,
  imports: [
    NgFor,
    CommonModule

  ]

})

export class MenuComponent {

  productsResult: { [category: string]: Product[] } = {}; //array de productos por categoría con clave categoria, usando el modelo de la interfaz para guardar los datos

  constructor(private authService: AuthService) {}





  loadProducts(): void{
    this.authService.mostrarMenu().subscribe(
      (data) =>{
        console.log(data);
        this.productsResult = data; //asigna lo que de el json a productsResult
      },
      (error) =>{
        console.log("Error");
      }
    )
  }

  //Cargar la funcion nada mas inicializar el componente
  ngOnInit(): void {

    this.loadProducts();
  }

  goToCategory(category: string): void {
    // Asegúrate de que el id de la categoría esté en mayúsculas
    const categoryId = category.toUpperCase();

    // Buscar el elemento correspondiente al id de la categoría en la página
    const element = document.getElementById(categoryId);

    // Si el elemento existe, desplazarse suavemente a esa sección
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    } else {
      console.log(`No se encontró la categoría ${categoryId}`);
    }
  }






}







