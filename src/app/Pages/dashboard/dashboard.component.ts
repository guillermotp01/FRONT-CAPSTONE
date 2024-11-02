import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Evento } from '../../Models/Evento';
import { EventoService } from '../../Services/evento.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterLink, CommonModule, RouterOutlet, FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})

export default class DashboardComponent implements OnInit{

  eventos: Evento[] = []; 

  constructor(private eventosService: EventoService) {}

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
}
