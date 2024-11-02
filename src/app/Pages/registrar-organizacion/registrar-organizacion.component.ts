import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { OrganizacionService } from '../../Services/organizacion.service';
import { Organizacion } from '../../Models/organizacion';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-registrar-organizacion',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './registrar-organizacion.component.html',
  styleUrl: './registrar-organizacion.component.css'
})
export default class RegistrarOrganizacionComponent {
  organizacion: Organizacion = new Organizacion();
  administradorId: number = 0;

  constructor(private organizacionService: OrganizacionService){}

  registrarOrganizacion() {
    // Obtén el ID del administrador antes de registrar la organización
    this.organizacionService.obtenerUsuarioActual().subscribe(
      (response: any) => {
        // Asigna el ID del administrador a la organización
        this.organizacion.administradorId = response.datos.administradorId;
        
        // Llama al servicio para registrar la organización
        this.organizacionService.agregarOrganizacion(this.organizacion).subscribe(resp => {
          if (resp) {
            Swal.fire('Registro Exitoso', 'La organización fue registrada', 'success');
          } else {
            Swal.fire('Error en el Registro', 'No se pudo registrar la organización', 'error');
          }
        });
      },
      (error) => {
        console.error('Error al obtener el usuario actual:', error);
        Swal.fire('Error', 'No se pudo obtener el ID del administrador', 'error');
      }
    );
  }
}
