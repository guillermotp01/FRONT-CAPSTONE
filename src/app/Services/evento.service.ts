import { Injectable } from '@angular/core';
import { appsettingsCliente } from '../Settings/appSettings';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Evento } from '../Models/Evento';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventoService {

  private apiUrl = appsettingsCliente.apiUrl + "/Evento";

  constructor(private http: HttpClient) { }

  listarEvento(): Observable<Evento[]> {
    if (typeof window !== 'undefined' && localStorage) {
        const token = localStorage.getItem('token');
        const headers = new HttpHeaders({
            'Authorization': `Bearer ${token}`
        });

        return this.http.get<Evento[]>(`${this.apiUrl}/listar`, { headers });
    } else {
        console.error('localStorage no está disponible en este entorno.');
        return new Observable<Evento[]>(); 
    }
  }

  agregarEvento(evento: Evento): Observable<Evento[]> {
    if (typeof window !== 'undefined' && localStorage) {
        const token = localStorage.getItem('token');
        const headers = new HttpHeaders({
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        });
        return this.http.post<Evento[]>(`${this.apiUrl}/agregar`, evento, { headers });
    } else {
        console.error('localStorage no está disponible en este entorno.');
        return new Observable<Evento[]>(); 
    }
  }

  actualizarEvento(id: number, evento: Evento): Observable<Evento> {
    if (typeof window !== 'undefined' && localStorage) {
        const token = localStorage.getItem('token');
        const headers = new HttpHeaders({
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        });
        return this.http.put<Evento>(`${this.apiUrl}/actualizar/${id}`, evento, { headers });
    } else {
        console.error('localStorage no está disponible en este entorno.');
        return new Observable<Evento>(); 
    }
  }

  eliminarEvento(id: number): Observable<Evento> {
    if (typeof window !== 'undefined' && localStorage) {
        const token = localStorage.getItem('token');
        const headers = new HttpHeaders({
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        });
        return this.http.delete<Evento>(`${this.apiUrl}/eliminar/${id}`, { headers });
    } else {
        console.error('localStorage no está disponible en este entorno.');
        return new Observable<Evento>(); 
    }
  }
}
