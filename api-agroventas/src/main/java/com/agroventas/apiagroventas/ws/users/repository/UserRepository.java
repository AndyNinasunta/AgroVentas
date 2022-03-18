package com.agroventas.apiagroventas.ws.users.repository;

import com.agroventas.apiagroventas.RootEntity;
import com.agroventas.apiagroventas.ws.users.models.DataClienteResponse;
import com.agroventas.apiagroventas.ws.users.models.LoginResponse;
import com.agroventas.apiagroventas.ws.users.models.RegClienteResponse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<RootEntity, Integer> {
    @Query(value = "SELECT * FROM fnLogin(:us, :ps)", nativeQuery = true)
    LoginResponse loginUser(@Param("us") String us,@Param("ps")  String ps);

    @Query(value = "SELECT validador FROM fnVerificaCliente(:ruc)", nativeQuery = true)
    String verifUser(@Param("ruc") String ruc);

    @Query(value = "SELECT * FROM fnRegistrarCliente(:nm, :dr, :ruc, :mail, :tel)", nativeQuery = true)
    RegClienteResponse regUser(@Param("nm") String nm,
                               @Param("dr") String dr,
                               @Param("ruc") String ruc,
                               @Param("mail") String mail,
                               @Param("tel") String tel);

    @Query(value = "SELECT * FROM fnObtenerDatosCliente(:idruc)", nativeQuery = true)
    DataClienteResponse dataClient(@Param("idruc") String idruc);
}
