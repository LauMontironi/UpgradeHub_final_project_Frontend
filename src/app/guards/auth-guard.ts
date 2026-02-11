import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import Swal from 'sweetalert2';

export const authGuard: CanActivateFn = (route, state) => {
  const token = localStorage.getItem('token');
  const router = inject(Router);
  
  if (!token) {
    Swal.fire({
      icon: 'error',
      title: 'Acceso denegado',
      text: 'Debes iniciar sesión para ver esta página',
      confirmButtonColor: '#ffc107'
    });
    router.navigate(['/login']);
    return false;
  }
  return true;
};
