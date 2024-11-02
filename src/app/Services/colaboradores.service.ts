import { Injectable } from '@angular/core';
import { appsettingsCliente } from '../Settings/appSettings';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Colaborador } from '../Models/Colaborador';

@Injectable({
  providedIn: 'root'
})
export class ColaboradoresService {

  private apiUrl = appsettingsCliente.apiUrl + "/Colaborador";

  constructor(private http: HttpClient) { }

  listarColaboradores(): Observable<Colaborador[]> {
    if (typeof window !== 'undefined' && localStorage) {
        const token = localStorage.getItem('token');
        const headers = new HttpHeaders({
            'Authorization': `Bearer ${token}`
        });

        return this.http.get<Colaborador[]>(`${this.apiUrl}/listar`, { headers });
    } else {
        console.error('localStorage no está disponible en este entorno.');
        return new Observable<Colaborador[]>(); 
    }
  }

  agregarColaboradores(colaborador: Colaborador): Observable<Colaborador[]> {
    if (typeof window !== 'undefined' && localStorage) {
        const token = localStorage.getItem('token');
        const headers = new HttpHeaders({
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        });
        return this.http.post<Colaborador[]>(`${this.apiUrl}/agregar`, colaborador, { headers });
    } else {
        console.error('localStorage no está disponible en este entorno.');
        return new Observable<Colaborador[]>(); 
    }
  }

  actualizarColaboradores(id: number, colaborador: Colaborador): Observable<Colaborador> {
    if (typeof window !== 'undefined' && localStorage) {
        const token = localStorage.getItem('token');
        const headers = new HttpHeaders({
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        });
        return this.http.put<Colaborador>(`${this.apiUrl}/actualizar/${id}`, colaborador, { headers });
    } else {
        console.error('localStorage no está disponible en este entorno.');
        return new Observable<Colaborador>(); 
    }
  }

  eliminarColaboradores(id: number): Observable<Colaborador> {
    if (typeof window !== 'undefined' && localStorage) {
        const token = localStorage.getItem('token');
        const headers = new HttpHeaders({
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        });
        return this.http.delete<Colaborador>(`${this.apiUrl}/eliminar/${id}`, { headers });
    } else {
        console.error('localStorage no está disponible en este entorno.');
        return new Observable<Colaborador>(); 
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
