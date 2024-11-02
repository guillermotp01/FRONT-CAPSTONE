import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Organizacion } from '../Models/organizacion';
import { Observable } from 'rxjs';
import { appsettingsCliente } from '../Settings/appSettings';

@Injectable({
  providedIn: 'root'
})
export class OrganizacionService {
  private apiUrl = appsettingsCliente.apiUrl + "/Acceso";

  constructor(private http: HttpClient) {}

  agregarOrganizacion(organizacion: Organizacion): Observable<Organizacion[]> {
    if (typeof window !== 'undefined' && localStorage) {
        const token = localStorage.getItem('token');
        const headers = new HttpHeaders({
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        });
        return this.http.post<Organizacion[]>(`${this.apiUrl}/registrarOrg`, organizacion, { headers });
    } else {
        console.error('localStorage no está disponible en este entorno.');
        return new Observable<Organizacion[]>(); 
    }
  }

  public obtenerUsuarioActual() {
    if (typeof window !== 'undefined' && localStorage) {
      const token = localStorage.getItem('token');
      const headers = new HttpHeaders({
          'Authorization': `Bearer ${token}`
      });
      return this.http.get(`http://localhost:5073/Acceso/usuarioActual`, {headers});
    } else {
      console.error('localStorage no está disponible en este entorno.');
      return new Observable<any[]>(); 
    }
  }
}
