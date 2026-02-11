import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { IResena } from '../Interfaces/Iresena';

@Injectable({
  providedIn: 'root',
})
export class Resenas {
  

  private http = inject(HttpClient);
  private base_url = 'https://upgradehubfinalproject-production.up.railway.app';

  getResenas() {
    return firstValueFrom(
      this.http.get<IResena[]>(`${this.base_url}/resenas/`)
    )
  
  }


}