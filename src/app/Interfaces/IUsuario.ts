export interface IUsuario {
  id?: number; 
  nombre: string;
  apellido: string;
  dni: string;
  email: string;
  password: string;
  telefono: string;
  edad: number; 
  alergias: string;
  rol: string //'cliente' | 'admin'; por defecto saiemre cliente 
}


export interface RegisterResponse {
  msg: string;      // Mensaje informativo: "usuario registrado correctamente"
  item: IUsuario;   // El objeto usuario creado
}