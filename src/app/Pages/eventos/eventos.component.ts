import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { EventoService } from '../../Services/evento.service';
import { Evento } from '../../Models/Evento';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ColaboradoresService } from '../../Services/colaboradores.service';

@Component({
  selector: 'app-eventos',
  standalone: true,
  imports: [RouterLink, CommonModule, RouterOutlet, FormsModule],
  templateUrl: './eventos.component.html',
  styleUrl: './eventos.component.css'
})
export default class EventosComponent implements OnInit {
  eventos: Evento[] = []; 
  showModalAgregar = false;
  showModalActualizar = false;
  showModalEliminar = false;
  idOrganizacion: number = 0;
  idColaboradorEliminar: number = 0;
  evento: Evento = new Evento();

  constructor(private eventosService: EventoService, private colaboradorService: ColaboradoresService) {}

  crearEvento() {
    this.showModalAgregar = true;

    this.colaboradorService.obtenerUsuarioActual().subscribe(
      (response: any) => {
        this.idOrganizacion = response.datos.idOrganizacion;

        this.evento = {
          idEvento: 0,
          nombre: '',
          descripcion: '',
          fechaInicio: '',
          fechaFin: '',
          ubicacion: '',
          estado: '',
          tipoEvento: '',
          organizacionId: this.idOrganizacion
        };
      },
      (error) => {
        console.error('Error al obtener el colaborador actual:', error);
      }
    );
  }


  ngOnInit(): void {
    this.obtenerEventos();
  }

  obtenerEventos(): void {
    this.eventosService.listarEvento().subscribe(
        eventos => {
            this.eventos = eventos;
        },
        error => {
            console.error('Error al obtener eventos:', error);
        }
    );
  }

  agregarEvento() {
    this.eventosService.agregarEvento(this.evento).subscribe(resp => {
      if (resp) {
        this.obtenerEventos();  
      }
    });
    this.showModalAgregar = false;
  }

  cerrarModalAgregar() {
    this.showModalAgregar = false;
  }
}
