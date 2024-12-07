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
  addItem(product: Product, options?: { cookingPoint?: string; sauce?: string }): void {
    const repeatedItem = this.items.find((item) => item.product.id === product.id);

    if (repeatedItem) {
      repeatedItem.ammount++;
      // Actualiza las opciones si ya existe el producto
      if (options) {
        repeatedItem.product.cookingPoint = options.cookingPoint || repeatedItem.product.cookingPoint;
        repeatedItem.product.sauce = options.sauce || repeatedItem.product.sauce;
      }
    } else {
      // Agrega un nuevo producto al carrito con las opciones especificadas
      const newProduct = { ...product, ...options }; //operador rest para sacar tanto el valor de los productos como las posibles opciones seleccionadas
      this.items.push({ product: newProduct, ammount: 1 });
    }
  }

  // Método para sacar todos los items del carrito
  getItems(): { product: Product; ammount: number }[] {
    return this.items;
  }

  // Método para contar los productos del carrito
  getItemsNumber(): number {

    return this.items.reduce((total, item) => total + item.ammount, 0);


  }

  // Métodos para calcular totales, el primero dinero real, el segundo puntos totales y el tercero puntos obtenidos si se comprara con dinero real
  getTotalPrice(): number {
    return this.items.reduce((total, item) => {
      const price = item.product.discounted_price ?? item.product.price_real; // Usar el precio con la rebaja aplicada si esta ya calculado
      return total + price * item.ammount;
    }, 0);
  }

  getTotalPoints(): number {
    return this.items.reduce((total, item) => total + item.product.price_points * item.ammount, 0);
  }

  getPointsEarned(): number {
    return this.getTotalPoints() * 0.5; // El 50% del total de puntos de ganancia para el saldo
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
  clearCart(): void {
    this.items = [];
    console.log('El carrito ha sido vaciado');
  }


  //
  checkPromoStatus(productId: number): boolean {
    const product = this.getProductById(productId)?.product;
    if (!product) return false;

    // Si no hay descuento o el precio descontado es nulo
    return product.discounted_price !== null;
  }

  applyPromoCode(promoCode: { code: string; discount: number; product_id?: number; category_name?: string }): boolean {
    let discountApplied = false;

    this.items.forEach((item) => {
      console.log('Verificando descuento para el producto:', item.product.name);
      console.log('Precio real:', item.product.price_real);
      console.log('Descuento aplicado:', promoCode.discount);
      console.log('Precio con descuento anterior:', item.product.discounted_price);

      if (promoCode.product_id && item.product.id === promoCode.product_id) {
        item.product.discounted_price = item.product.price_real - (item.product.price_real * promoCode.discount) / 100;
        discountApplied = true;
      }

      if (promoCode.category_name && item.product.category === promoCode.category_name) {
        item.product.discounted_price = item.product.price_real - (item.product.price_real * promoCode.discount) / 100;
        discountApplied = true;
      }

      console.log('Nuevo precio con descuento:', item.product.discounted_price);
    });

    return discountApplied;
  }

}

