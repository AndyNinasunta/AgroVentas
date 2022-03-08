package com.agroventas.apiagroventas.ws.users.models;

import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
public class SensorInfo {
    String humedad;
    String peso;
    String mac;
}