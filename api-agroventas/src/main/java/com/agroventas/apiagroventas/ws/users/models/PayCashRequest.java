package com.agroventas.apiagroventas.ws.users.models;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigInteger;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class PayCashRequest {
    int rmnid;
    int cajero;
    float payvalue;
    int paymth;
}
