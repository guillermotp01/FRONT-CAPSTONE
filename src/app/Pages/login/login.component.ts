import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { LoginService } from '../../Services/login.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, HttpClientModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export default class LoginComponent {
  username: string = '';
  password: string = '';

  private router = inject(Router);
  private loginService = inject(LoginService); 

  constructor() {}

  onSubmit() {
    this.loginService.login(this.username, this.password).subscribe({
        next: (response) => {
            console.log(response); 
            if (response.token) {
                this.loginService.loginUser(response.token, response.rol);
                if (response.rol == 'Administrador') {
                  this.router.navigate(['pagina/registrarOrganizacion']);
                  Swal.fire('Éxito', 'Inicio de sesión exitoso', 'success');
                }else{
                  this.router.navigate(['pagina/dashboard']);
                  Swal.fire('Éxito', 'Inicio de sesión exitoso', 'success');
                }
            } else {
                Swal.fire('Error', 'No se recibió un token', 'error');
            }
        },
        error: (error) => {
            Swal.fire('Error', 'Credenciales incorrectas', 'error');
        }
    });
  }

  dashboard() {
    this.router.navigate(['pagina/dashboard']);
  }
}
