import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";


@Injectable({
  providedIn: 'root',


})

export class AuthService {
  private mysqlUrl = 'http://localhost/backend/conexion.php'; //enlace al backend en htdocs en php de xampp

  constructor(private conexiones: HttpClient) { }
  registro(username: string, email: string, password: string): Observable<any> {
    return this.conexiones.post(`${this.mysqlUrl}/registro.php`, { username, email, password });

  }

  login(email: string, password: string): Observable<any> {
    return this.conexiones.post(`${this.mysqlUrl}/login.php`, { email, password });
  }

}


