import { Injectable } from '@angular/core';
import { Product } from '../interfaces/products.interface';



@Injectable({
  providedIn: 'root'
})


export class CartService {
  constructor() { }

  // Cambia de Product[] a un array que incluya cantidad
  private items: { product: Product; ammount: number }[] = [];

  // Método para añadir un producto
  addItem(product: Product): void {
    //Busca el producto mediante su id y comprueba si son iguales
    const repeatedItem = this.items.find((item) => item.product.id === product.id);

    //Si lo son incrementa su cantidad sin duplicarlo
    if (repeatedItem) {

      repeatedItem.ammount++;
      console.log('Producto repetido, incrementando cantidad:', repeatedItem);
    } else {
      //Y si no lo añade a la lista del carrito
      this.items.push({ product, ammount: 1 });
      console.log('Producto añadido al carrito:', product);
    }
  }

  // Método para sacar todos los items del carrito
  getItems(): { product: Product; ammount: number }[] {
    return this.items;
  }

  // Método para contar los productos del carrito
  getItemsNumber(): number {
    console.log('Número de items en el carrito:', this.items.length);

    return this.items.reduce((total, item) => total + item.ammount, 0);


  }

  // Métodos para calcular totales, el primero dinero real, el segundo puntos totales y el tercero puntos obtenidos si se comprara con dinero real
  getTotalPrice(): number {
    return this.items.reduce((total, item) => total + item.product.price_real * item.ammount, 0);
  }

  getTotalPoints(): number {
    return this.items.reduce((total, item) => total + item.product.price_points * item.ammount, 0);
  }

  getPointsEarned(): number {
    return this.getTotalPoints() * 0.5; // El 50% del precio en puntos
  }

  // Eliminar un producto o disminuir su cantidad, usando findIndex para buscar el primer elemento
  removeItem(productId: number): void {
    const itemIndex = this.items.findIndex((item) => item.product.id === productId);

    if (itemIndex !== -1) {
      if (this.items[itemIndex].ammount > 1) {
        this.items[itemIndex].ammount--;
      } else {
        this.items.splice(itemIndex, 1); // Eliminar si la cantidad es 0
      }
    }
  }

  // Método para obtener un producto por su ID
  getProductById(productId: number): { product: Product; ammount: number } | undefined {
    return this.items.find(item => item.product.id === productId);  // Busca el producto en el carrito por su ID
  }

  // Método para actualizar la salsa del producto en el carrito
  updateSauce(productId: number, sauce: string): void {
    const item = this.items.find(item => item.product.id === productId);
    if (item) {
      item.product.sauce = sauce;  // Actualiza la salsa del producto en el carrito
      console.log(`Salsa actualizada para el producto ${productId}: ${sauce}`);
    }
  }

  // Método para actualizar el punto de cocción del producto en el carrito
  updateCookingPoint(productId: number, cookingPoint: string): void {
    const item = this.items.find(item => item.product.id === productId);
    if (item) {
      item.product.cookingPoint = cookingPoint;  // Actualiza el punto de cocción del producto en el carrito
      console.log(`Punto de cocción actualizado para el producto ${productId}: ${cookingPoint}`);
    }
  }
}

