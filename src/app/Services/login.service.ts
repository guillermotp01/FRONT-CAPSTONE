import { Injectable } from '@angular/core';
import { appsettingsCliente } from '../Settings/appSettings';
import { Observable, Subject, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public loginStatusSubject = new Subject<boolean>();
  
  private apiUrl = appsettingsCliente.apiUrl + "/Acceso";
  
  constructor(private http: HttpClient) { }


  login (username:string,password:string): Observable<any>{
    const body ={username,password}
    return this.http.post(`${this.apiUrl}/Ingresar`,body);
  }

  public obtenerUsuarioActual() {
    return this.http.get(`${this.apiUrl}/usuarioActual`);
  }

  public loginUser(token: any, rol: string) {
    localStorage.setItem('token', token);
    localStorage.setItem('rol', rol)
    return true;
  }

  public setUser(username: any) {
    localStorage.setItem('user', JSON.stringify(username));  
  }

  public getUser() {
    if (typeof window !== 'undefined' && localStorage) {
      let userStr = localStorage.getItem('user');
      if (userStr != null) {
        return JSON.parse(userStr);
      } else {
        this.logout();
        return null;
      }
    }
    return null;   
  }

  public isLoggedIn(): boolean {
    if (typeof window !== 'undefined' && localStorage) {
      const token = localStorage.getItem('token');
      return !!token;
    }
    return false;
  }

  public logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('rol');
    this.loginStatusSubject.next(false);
    return true;
  }

  public getToken(): string | null {
    const token = localStorage.getItem('token');
    console.log('Token recuperado:', token); 
    return token;
  }

  public setUserRol(rol: string) {
    localStorage.setItem('rol', rol);
  }

  public getUserRol() {
    return localStorage.getItem('rol');
  }
}
