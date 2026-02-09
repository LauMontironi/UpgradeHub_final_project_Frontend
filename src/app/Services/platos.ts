import { Injectable, inject} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { IPlato } from '../Interfaces/IPlatos';


@Injectable({
  providedIn: 'root',
})
export class Platos {
 
  private HttpClient = inject(HttpClient);
  private base_url = 'https://upgradehubfinalproject-production.up.railway.app';


  getAll() {
    return firstValueFrom(
      this.HttpClient.get<IPlato[]>(`${this.base_url}/platos/platos`)
    )
  }
}
