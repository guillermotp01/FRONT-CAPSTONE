import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../Services/login.service';
import { UsuarioActual } from '../../Models/UsuarioActual';
import { ColaboradoresService } from '../../Services/colaboradores.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  public username: string | null = null;

  constructor(private colaboradorService: ColaboradoresService) {}

  ngOnInit() {
    this.obtenerUsuarioActual(); 
  }

  obtenerUsuarioActual(): void {
    this.colaboradorService.obtenerUsuarioActual().subscribe(
      (response: any) => { 
        this.username = response.datos.username; 
      },
      (error) => {
        console.error('Error al obtener usuario actual:', error);
      }
    );
  }
}
