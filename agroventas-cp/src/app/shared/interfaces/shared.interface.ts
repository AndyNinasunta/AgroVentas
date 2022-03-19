export interface UserI {
  ruc: string;
  cliente: string;
  mail: string;
  direccion: string;
  telefono: string;
}

export interface TicketNotWeighedI {
  tickt: string;
  ingreso: string;
  estado: string;
}

export interface TicketWeighedI {
  tickt: string;
  ingreso: string;
  estado: string;
  pago: number;
}

//{"ruc":"1207245927","cliente":"Jose","mail":"jose@gmail.com","direccion":"Venus, Quevedo","telefono":"0983647583"}
