import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";


@Injectable({
  providedIn: 'root',


})

export class AuthService {
  private mysqlUrl = 'http://localhost/backend'; //enlace al backend en htdocs en php de xampp

  constructor(private conexiones: HttpClient) { }
  registro(username: string, email: string, password: string): Observable<any> {
    return this.conexiones.post(`${this.mysqlUrl}/registro.php`, { username, email, password });

  }

  login(email: string, password: string): Observable<any> {
    return this.conexiones.post(`${this.mysqlUrl}/login.php`, { email, password });
  }

  sendFeedBack(datos: any): Observable<any> {
    return this.conexiones.post(`${this.mysqlUrl}/feedback.php`, datos);
  }


  mostrarMenu(): Observable<any> {
    return this.conexiones.get<any>(`${this.mysqlUrl}/menu.php`);
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
}




