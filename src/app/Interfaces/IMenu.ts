export interface IMenu {
  id: number;
  fecha: string;
  nombre: string;   // o date?
  descripcion: string;
  foto_url: string;
  precio: number;
}

export interface IMenuResponse {
  msg: string;
  item: IMenu;
}