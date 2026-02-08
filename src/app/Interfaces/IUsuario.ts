export interface IUsuario {
  id: number;
  nombre: string;
  apellido: string;
  email: string;
  telefono: string;
  edad: number; // en registro se pide fecha de nacimiento, pero para simplificar el backend solo maneja edad
  alergias: string; // string u opciones predefinidas?
  dni: string; // falta agtregar el campo dni en el backend para que esto funcione correctamente!!
  password: string; // TODO: falta agregar el campo password en el backend para que esto funcione correctamente!
}


export interface RegisterResponse {
  msg: string;      // Mensaje informativo: "usuario registrado correctamente"
  item: IUsuario;   // El objeto usuario creado
}