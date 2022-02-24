export interface TicketI {
    codTicket: string;
    fechaGen: string;
    horaGen: string;
    identCliente: string;
    nombresCliente: string;
    cantTentSacos: number;
}

export interface PesajeDetalleI {
    rowNumber: number;
    producto: string;
    variedad: string;
    detalle: string;
    cantidad: number;
    tara: string;
    librasTara: number;
}
