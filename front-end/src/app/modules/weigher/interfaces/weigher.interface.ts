export interface TicketI {
    codTicket: string;
    fechaGen: string;
    horaGen: string;
    identCliente: string;
    nombresCliente: string;
    cantTentSacos: number;
}




export interface PesajeDetalleI {
    id: string;
    producto: string;
    cantidad: number;
    id_tara_saco: number;
    libra_tara: number;
    cantidad_sacos: number;
    varios_sacos: boolean;
    tara_saco?: string;
    detalle?: string;
    calificación?: number;
}