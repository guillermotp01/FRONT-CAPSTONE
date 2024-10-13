import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../auth.service';  // Ruta corregida
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';  // Importar FormsModule
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, HttpClientModule, FormsModule],  // FormsModule agregado
  providers: [AuthService],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export default class LoginComponent {
  username: string = '';
  password: string = '';

  private router = inject(Router)
  dashboard(){
    this.router.navigate(['dashboard']);
  }

  constructor(private authService: AuthService) {}

  onSubmit() {
    this.authService.login(this.username, this.password).subscribe({
      next: (response) => {
        if (response.token) {
          this.authService.saveToken(response.token); // Guardar el token si es generado
          console.log('Login exitoso!', response);
          this.dashboard();
        } else {
          console.error('Login fallido', response.Estado);
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Fallaste en tu inicio de sesión tontin",
          });
        }
      },
      error: (err) => {
        console.error('Error en la solicitud', err);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Error de Servidor",
        });
      }
    });
  }
}
