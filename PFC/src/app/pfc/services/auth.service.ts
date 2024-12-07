import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, ObservableLike } from "rxjs";
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root',


})


export class AuthService {
  // private mysqlUrl="http://proyectotf.atwebpages.com/php";
  private mysqlUrl = 'http://localhost/backend'; //enlace al backend en htdocs en php de xampp

  constructor(private conexiones: HttpClient, private router: Router) { }


  //USUARIO

  //Método para guardar los datos de un usuario al registrarse
  registro(username: string, email: string, password: string): Observable<any> {
    return this.conexiones.post(`${this.mysqlUrl}/registro.php`, { username, email, password });

  }

  //Método para redireccionar a los usuarios o administradores a diferentes rutas dependiendo del campo email obtenido
  login(email: string, password: string): Observable<any> {
    return this.conexiones.post(`${this.mysqlUrl}/login.php`, { email, password });
  }

  //Enviar el resultado del formulario de feedback
  sendFeedBack(datos: any): Observable<any> {
    return this.conexiones.post(`${this.mysqlUrl}/feedback.php`, datos);
  }


  //Mostrar los productos de la base de datos
  mostrarMenu(): Observable<any> {
    return this.conexiones.get<any>(`${this.mysqlUrl}/menu.php`);
  }


  // Método para crear una sesión de pago en el backend con dinero real
  createCheckoutSession(email: string, cartItems: any[], totalPrice: number, address: string): Observable<any> {
    return this.conexiones.post<any>(`${this.mysqlUrl}/checkout.php`, { email, cartItems, totalPrice, address });
  }
  //Lo mismo pero para los puntos
  createCheckoutPoints(email: string, cartItems: any[], totalPoints: number, address: string): Observable<any> {

    return this.conexiones.post<any>(`${this.mysqlUrl}/checkoutPoints.php`, { email, cartItems, totalPoints, address }, {
      headers: { 'Content-Type': 'application/json' }

    });

  }

  // Método para almacenar los datos del usuario en sessionStorage
  setUserData(userData: any): void {
    sessionStorage.setItem('user', JSON.stringify(userData)); // Guarda los datos como JSON en sessionStorage
  }

  // Método para obtener los datos del usuario desde sessionStorage
  getUserData(): any {
    const userData = sessionStorage.getItem('user'); // Recupera los datos de sessionStorage
    return userData ? JSON.parse(userData) : null; // Si los datos existen, los parsea; si no, devuelve null
  }



  // Método para obtener el saldo del usuario desde los datos de la sesión
  getBalance(): number {
    const userData = this.getUserData();
    if (userData) {
      return userData.balance;  // Devuelve el saldo almacenado
    }
    return 0;  // Devuelve 0 si no hay datos disponibles
  }


  //Método para actualizar el saldo en la base de datos dependiendo del id de cada usuario logueado tras realizar una compra.
  updateBalance(email: string, pointsEarned: number): Observable<any> {


    return this.conexiones.post<any>(`${this.mysqlUrl}/updateBalance.php`, { email, pointsEarned }, {
      headers: { 'Content-Type': 'application/json' }
    });
  }

  checkPaymentStatus(sessionId: string): Observable<any> {
    return this.conexiones.post(`${this.mysqlUrl}/checkPaymentStatus.php`, { sessionId });
  }

  updateUserBalance(newBalance: number): void {
    // Actualizar el saldo en el localStorage o cualquier otra fuente persistente
    const userData = this.getUserData();
    if (userData) {
      userData.balance = newBalance;
      this.setUserData(userData);  // Guarda los nuevos datos del usuario
    }
  }


  getSaldo(email: string): Observable<any> {
    return this.conexiones.post<any>(`${this.mysqlUrl}/getBalance.php`, { email });
  }


  getUserSession(email: string): Observable<any> {
    return this.conexiones.post<any>(`${this.mysqlUrl}/getData.php`, { email });

  }

  getTransactions(email: string): Observable<any> {
    return this.conexiones.post<any>(`${this.mysqlUrl}/getTransactions.php`, { email });
  }

  //Obtener lista de amigos de un usuario
  getFriends(email: string): Observable<any> {
    return this.conexiones.post<any>(`${this.mysqlUrl}/getFriends.php`, { email });
  }

  // Agregar un nuevo amigo usando el nombre de usuario
  addFriend(email: string, newFriendUsername: string): Observable<any> {
    return this.conexiones.post<any>(`${this.mysqlUrl}/addFriend.php`, { email, newFriendUsername });
  }

  // Eliminar un amigo usando el nombre de usuario
  removeFriend(email: string, friendId: number): Observable<any> {
    return this.conexiones.post<any>(`${this.mysqlUrl}/removeFriend.php`, { email, friendId });
  }

  // Enviar saldo a un amigo con un objeto de 3 parámetros en vez de los 3 por separado
  sendBalance(data: { senderEmail: string, receiverEmail: string, points: number }): Observable<any> {

    return this.conexiones.post<any>(`${this.mysqlUrl}/sendBalance.php`, data);
  }




  logout(): void {
    // Eliminar los datos de sesión (por ejemplo, localStorage o sessionStorage)
    localStorage.removeItem('userData');  // O sessionStorage, según corresponda

    // Redirigir a la página de inicio de sesión
    this.router.navigate(['/login']);
  }



  //ADMININISTRADOR

  //Sacar los datos de los usuarios registrados
  getUsers(): Observable<any[]> {
    return this.conexiones.get<any[]>(`${this.mysqlUrl}/usersRegistered.php`); //get para sacar valores sin pasar ninguno
  }

  //Insertar un nuevo producto
  addProduct(product: any): Observable<any> {
    return this.conexiones.post<any>(`${this.mysqlUrl}/addProduct.php`, product);
  }

  //Borrar un producto existente
  deleteProduct(productId: number): Observable<any> {
    return this.conexiones.delete<any>(`${this.mysqlUrl}/deleteProduct.php`, {
      body: { id: productId },  // Pasar el ID como cuerpo de la solicitud
      headers: ({
        'Content-Type': 'application/json'
      })
    });
  }
  updateProduct(product: any): Observable<any> {
    return this.conexiones.put(`${this.mysqlUrl}/updateProduct.php`, product);
  }



  //Sacar las valoraciones de los usuarios
  getFeedback(): Observable<any[]> {
    return this.conexiones.get<any[]>(`${this.mysqlUrl}/mail.php`);





  }


  // Obtener todos los códigos promocionales
  getPromos(): Observable<any> {
    return this.conexiones.get(`${this.mysqlUrl}/getPromos.php`);
  }

  // Crear un nuevo código promocional
  addPromos(promoCode: { code: string; discount: number; product_id?: number | null; category_name?: string | null; }): Observable<any> {
    return this.conexiones.post(`${this.mysqlUrl}/addPromo.php`, promoCode);
  }


  //actualizar un código promocional
  updatePromo(code: string): Observable<any> {
    return this.conexiones.post(`${this.mysqlUrl}/updatePromo.php`, { code });
  }


  //borrar un código de promoción
  deletePromo(code: string): Observable<any> {
    return this.conexiones.post(`${this.mysqlUrl}/deletePromo.php`, { code });
  }

  //aplicar un descuento
  applyPromo(code: string): Observable<any> {
    return this.conexiones.post(`${this.mysqlUrl}/applyPromo.php`, { code })
  }






}



