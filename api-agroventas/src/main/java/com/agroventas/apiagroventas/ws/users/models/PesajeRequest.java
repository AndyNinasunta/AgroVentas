package com.agroventas.apiagroventas.ws.users.models;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class PesajeRequest {
    String rcd;
    int variedadid;
    int estadoid;
    double calificacion;
    double precio;
    int pesadorid;
    int productoid;
    String detalle;
    double cantidad;
    int recipienteid;
    double pesorecipiente;
}
