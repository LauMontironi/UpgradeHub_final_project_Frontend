
import { firstValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ILogin, IUsuario , RegisterResponse } from '../Interfaces/IUsuario';


@Injectable({
  providedIn: 'root',
})
export class Usuarios {
  
  private HttpClient = inject(HttpClient);
  private base_url = 'https://upgradehubfinalproject-production.up.railway.app';


  //metodo post

  registro(nuevoUsuario: IUsuario) {
    return firstValueFrom(
      this.HttpClient.post<RegisterResponse>(`${this.base_url}/auth/register`, nuevoUsuario))
  }
  

 
}

