package com.agroventas.apiagroventas.ws.users.models;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class SensorInfo {
    String humedad;
    String peso;
    String mac;
}