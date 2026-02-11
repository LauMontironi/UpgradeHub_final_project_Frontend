import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-perfil-usuario',
  imports: [CommonModule],
  templateUrl: './perfil-usuario.html',
  styleUrl: './perfil-usuario.css',
})
export class PerfilUsuario implements OnInit {
  router = inject(Router);
  
  nombreUsuario: string = '';
  apellidoUsuario: string = '';
  rolUsuario: string = '';

  ngOnInit() {
    // Obtener datos del usuario desde localStorage
    this.nombreUsuario = localStorage.getItem('user_name') || 'Usuario';
    this.apellidoUsuario = localStorage.getItem('user_apellido') || '';
    this.rolUsuario = localStorage.getItem('user_role') || '';

    // Verificar que sea usuario cliente
    if (this.rolUsuario !== 'cliente') {
      this.router.navigateByUrl('/');
    }
  }

  // Métodos de navegación
  irAEfectuarReserva() {
    this.router.navigateByUrl('/reserva');
  }

  irAVerReservas() {
    this.router.navigateByUrl('/reservas');
  }

  irAGestionarReservasModal() {
    // Esta opción podría abrir un modal o ir a una página
    this.router.navigateByUrl('/gestionar-reservas');
  }

  logout() {
    localStorage.clear();
    this.router.navigateByUrl('/login');
  }
}
