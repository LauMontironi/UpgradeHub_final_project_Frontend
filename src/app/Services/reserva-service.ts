import { IMenuDetalle } from './../Interfaces/IMenuDetalle';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { IMesa } from '../Interfaces/IMesa';
import { IReserva, ReservaResponse } from '../Interfaces/IReserva';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root',
})
export class ReservaService {
  
  private http = inject(HttpClient);
  private base_url = 'https://upgradehubfinalproject-production.up.railway.app';

  getMesas() {
    return firstValueFrom(
      this.http.get<IMesa[]>(`${this.base_url}/mesas`)
    )
  
  }
  createReserva(reserva: IReserva) {
    return firstValueFrom(
      this.http.post<ReservaResponse>(`${this.base_url}/reservas`, reserva )
   )
 }
  
  /// esta funcion eta hecha asi porque el tipo irserva ya estaba creado sin fecha y para no romper lo que ya estaba hecho : 
  
  getallReservas() {
  return firstValueFrom(
    this.http.get<IReserva[]>(`${this.base_url}/reservas`).pipe(
      map(reservas => reservas.map(res => ({
        ...res,
        // Si hora es un número (segundos), lo pasamos a HH:mm
        // Si ya es string, lo dejamos tal cual
        hora: typeof res.hora === 'number' ? this.convertirSegundos(res.hora) : res.hora
      })))
    )
  );
}

// Función pequeñita para no ensuciar
private convertirSegundos(segundos: number): string {
  const h = Math.floor(segundos / 3600);
  const m = Math.floor((segundos % 3600) / 60);
  return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
}





}
