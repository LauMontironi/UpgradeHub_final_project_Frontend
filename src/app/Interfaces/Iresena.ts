export interface IResena {
    id?: number;
    usuario_id: number;
    comentario: string;
    puntuacion: number;
    fecha: string;
    nombre?: string; // Este viene del JOIN con la tabla usuarios
    
    
    
}