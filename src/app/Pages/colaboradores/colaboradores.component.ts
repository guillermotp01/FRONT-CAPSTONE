import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ColaboradoresService } from '../../Services/colaboradores.service';
import { Colaborador } from '../../Models/Colaborador';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-colaboradores',
  standalone: true,
  imports: [CommonModule, RouterOutlet, FormsModule],
  templateUrl: './colaboradores.component.html',
  styleUrls: ['./colaboradores.component.css'] 
})
export default class ColaboradoresComponent implements OnInit {
  colaboradores: Colaborador[] = []; 
  showModalAgregar = false;
  showModalActualizar = false;
  showModalEliminar = false;
  idOrganizacion: number = 0;
  idColaboradorEliminar: number = 0;
  colaborador: Colaborador = new Colaborador();

  constructor(private colaboradorService: ColaboradoresService, private cd: ChangeDetectorRef) {}

  crearColaborador() {
    this.showModalAgregar = true;

    this.colaboradorService.obtenerUsuarioActual().subscribe(
      (response: any) => {
        this.idOrganizacion = response.datos.idOrganizacion;

        this.colaborador = {
          idColaborador: 0,
          nombre: '',
          apellido: '',
          tipoDoc: '',
          numDoc: '',
          tipoColaborador: '',
          correo: '',
          celular: '',
          organizacionId: this.idOrganizacion
        };
      },
      (error) => {
        console.error('Error al obtener el usuario actual:', error);
      }
    );
  }

  modalActualizar(item: any): void {
    this.showModalActualizar = true;
    this.colaborador = {
        idColaborador: item.idColaborador,
        nombre: item.nombre,
        apellido: item.apellido,
        tipoDoc: item.tipoDoc,
        tipoColaborador: item.tipoColaborador,
        numDoc: item.numDoc,
        correo: item.correo,
        celular: item.celular,
        organizacionId: item.organizacionId
    };
  }


  modalEliminar(id: number) {
    this.idColaboradorEliminar = id;
    this.showModalEliminar = true;
  }

  ngOnInit(): void {
    this.obtenerColaboradores();
  }

  obtenerColaboradores(): void {
    this.colaboradorService.listarColaboradores().subscribe(
        colaboradores => {
            this.colaboradores = colaboradores;
            this.cd.detectChanges(); 
        },
        error => {
            console.error('Error al obtener colaboradores:', error);
        }
    );
  }

  agregarColaborador() {
    this.colaboradorService.agregarColaboradores(this.colaborador).subscribe(resp => {
      if (resp) {
        this.obtenerColaboradores();  
      }
    });
    this.showModalAgregar = false;
  }

  actualizarColaborador() {
    const colaboradorId = this.colaborador.idColaborador;
    this.colaboradorService.actualizarColaboradores(colaboradorId, this.colaborador).subscribe(
        resp => {
            if (resp) {
                this.obtenerColaboradores();
            } else {
                console.error('Error al actualizar el colaborador');
            }
        },
        error => {
            console.error('Error en la actualización:', error);
        }
    );
    this.showModalActualizar = false;
  }

  eliminarColaborador(){
    this.colaboradorService.eliminarColaboradores(this.idColaboradorEliminar).subscribe(resp => {
      if(resp){
        this.obtenerColaboradores();
      }
    });
    this.showModalEliminar = false;
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

  cerrarModalActualizar() {
    this.showModalActualizar = false;
  }
}

