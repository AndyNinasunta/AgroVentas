package com.agroventas.apiagroventas.ws.users.repository;

import com.agroventas.apiagroventas.RootEntity;
import com.agroventas.apiagroventas.ws.users.models.TicketResponse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ProcessRepository extends JpaRepository<RootEntity, Integer> {
    @Query(value = "SELECT * FROM fnIngresoProducto(:ruc)", nativeQuery = true)
    TicketResponse genTicket(@Param("ruc") String ruc);
}
