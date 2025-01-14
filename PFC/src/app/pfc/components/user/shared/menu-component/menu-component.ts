import { Component } from '@angular/core';
import { AuthService } from '../../../../services/auth.service';
import { Product } from '../../../../interfaces/products.interface';
import { CommonModule, NgFor } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { cookingPointComponent } from '../dialogs/cooking-point/cooking-component';
import { addSauceComponent } from '../dialogs/add-sauce/add-sauce.component';
import { normalDialogComponent } from '../dialogs/normal-dialog/normal-dialog.component';
import { CartService } from '../../../../services/cart.service';

@Component({
  selector: 'menu',
  templateUrl: 'menu-component.html',
  styleUrl: 'menu-component.scss',
  standalone: true,
  imports: [
    NgFor,
    CommonModule,
    MatDialogModule,


  ]

})

export class MenuComponent {

  productsResult: { [category: string]: Product[] } = {}; //array de productos por categoría con clave categoria, usando el modelo de la interfaz para guardar los datos
  cartItemsTotal:number = 0;



  constructor(private authService: AuthService, private dialog: MatDialog, private cartService:CartService) { }





  loadProducts(): void {
    this.authService.mostrarMenu().subscribe(
      (data) => {

        this.productsResult = data; //asigna lo que de el json a productsResult
      }

    )
  }

  //Cargar la funcion nada mas inicializar el componente
  ngOnInit(): void {

    this.loadProducts();
    this.cartItemsTotal = this.cartService.getItemsNumber();

  }

  goToCategory(category: string): void {
   //Checkeo por si está en mayusculas
    const categoryId = category.toUpperCase();

    // Busca el elemento correspondiente al id de la categoría en la página
    const element = document.getElementById(categoryId);

    // Si el elemento existe, se desplaza suavemente a esa sección
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }


  //MODALES PARA EL MENU

  openCookingPointDialog(product: Product): void {
    const dialogRef = this.dialog.open(cookingPointComponent, {
      width: '300px',
      data: { product }

    });





  }
  openAddSauceDialog(product: Product): void {
    const dialogRef = this.dialog.open(addSauceComponent, {
      width: '300px',
      data: { product }
    });









  }

  //Este al ser el más básico actualiza una vez cerrado con el boton de añadir, el numero del carrito
  openNormalDialog(product:Product): void{
    const dialogRef = this.dialog.open(normalDialogComponent, {
      width: '300px',
      data:{product}
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.updateCartCount();
      }
    })

  }
 // Actualizar el número de productos en el carrito después de añadir un producto
  updateCartCount(): void {

    this.cartItemsTotal = this.cartService.getItemsNumber();

  }




}




