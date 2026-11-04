export interface Cliente {
  idCliente?: number;
  nombres: string;
  apellidos: string;
  identificacion: string;
  telefono: string;
  correo: string;
  direccion: string;
  estado: boolean;
}

export interface GuardarClienteRespuesta {
  mensaje: string;
  idCliente: number;
}
