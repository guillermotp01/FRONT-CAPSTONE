import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { LoginService } from '../../Services/login.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  private login = inject (LoginService)
  userRol: string | null;
  
  constructor(private loginService: LoginService) {
    this.userRol = this.loginService.getUserRol();
  }

  CerrarSesion(){
    this.login.logout();
  }
}
