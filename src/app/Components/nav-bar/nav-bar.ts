import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-nav-bar',
  imports: [RouterLink, RouterModule, CommonModule],
  templateUrl: './nav-bar.html',
  styleUrl: './nav-bar.css',
})
export class NavBar implements OnInit {

  router = inject(Router);
  
  menuOpen = false;
  isLogged = false;

  ngOnInit() {
    // Verificar si hay usuario logeado
    this.isLogged = !!localStorage.getItem('token');
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  closeMenu() {
    this.menuOpen = false;
  }

  onLogout() {
    localStorage.clear();
    this.isLogged = false;
    this.router.navigateByUrl('/login');
  }

}