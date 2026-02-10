import { Component, inject, signal } from '@angular/core';
import { Usuarios } from '../../Services/usuarios';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})


export class Login {
  usuarioService = inject(Usuarios);
  Router = inject(Router);
  // signal
  inputType = signal<string>('password');


  loginForm: FormGroup = new FormGroup({
    email: new FormControl(),
    password: new FormControl(),
  })


async onSubmit() {
  if (this.loginForm.invalid) {
    this.loginForm.markAllAsTouched();
    return;
  }

  try {
    const response = await this.usuarioService.login(this.loginForm.value);
    console.log('Respuesta completa del servidor:', response);

    // 1. EXTRAEMOS LOS DATOS (Usando los nombres exactos de tu log)
    const token = response.Token; 
    const userData = response.user; // <-- Cambiado de 'item' a 'user' para que coincida con tu log

    if (token && userData) {
      // 2. GUARDAMOS EN LOCALSTORAGE
      localStorage.setItem('token', token);
      localStorage.setItem('user_role', userData.rol);
      localStorage.setItem('user_name', userData.nombre);
      
      console.log('Token y User guardados. Mostrando alerta...');

      // 3. MENSAJE DE ÉXITO
      await Swal.fire({
        title: '¡Bienvenido!',
        text: `Hola, ${userData.nombre}. Inicio de sesión correcto`,
        icon: 'success',
        timer: 1500,
        showConfirmButton: false
      });

      // 4. REDIRECCIÓN SEGÚN ROL
      if (userData.rol === 'admin') {
        console.log('Es admin, yendo al dashboard...');
        this.Router.navigateByUrl('/admin-dashboard');
      } else {
        console.log('Es cliente, yendo a reserva...');
        this.Router.navigateByUrl('/reserva');
      }
    } else {
      console.error('El servidor no envió Token o user correctamente');
    }

  } catch (error) {
    console.error('Error detallado en Login:', error);
    await Swal.fire({
      title: 'Error al iniciar sesión',
      text: 'Credenciales incorrectas o error de servidor.',
      icon: 'error',
      confirmButtonColor: '#ffc107',
      confirmButtonText: 'Reintentar'
    });
  }
  }
  
  cambiarTipoInput() {
    this.inputType.update(val => val === 'password' ? 'text' : 'password');
  }

}
