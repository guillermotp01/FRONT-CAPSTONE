import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-colaboradores',
  standalone: true,
  imports: [CommonModule, RouterOutlet, FormsModule], // No necesitas importar tu propio componente aquí.
  templateUrl: './colaboradores.component.html',
  styleUrls: ['./colaboradores.component.css'] 
})
export default class ColaboradoresComponent {
  showModalAgregar = false;
  showModalEliminar = false;

  abrirModalAgregar() {
    this.showModalAgregar = true;
  }

  cerrarModalAgregar() {
    this.showModalAgregar = false;
  }

  abrirModalEliminar() {
    this.showModalEliminar = true;
  }

  cerrarModalEliminar() {
    this.showModalEliminar = false;
  }

  eliminarColaborador() {
    // Lógica para eliminar colaborador ekide
    console.log('Colaborador eliminado');
    this.cerrarModalEliminar();
  }
}

