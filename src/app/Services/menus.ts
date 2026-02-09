import { Injectable, inject} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { IMenu } from '../Interfaces/IMenu';
import { IMenuDetalle } from '../Interfaces/IMenuDetalle';



@Injectable({
  providedIn: 'root',
})
export class Menus {
  private HttpClient = inject(HttpClient);
  private base_url = 'https://upgradehubfinalproject-production.up.railway.app';
  
  
  getAll() {
    return firstValueFrom(
      this.HttpClient.get<IMenu[]>(`${this.base_url}/menus-semanales/`)
    )
  }
  
  getMenuId(id: number) {
    return firstValueFrom(
      this.HttpClient.get<IMenuDetalle>(`${this.base_url}/menus-semanales/${id}`)
    )
  }
}