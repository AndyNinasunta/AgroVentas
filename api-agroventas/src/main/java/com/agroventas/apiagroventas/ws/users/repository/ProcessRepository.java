package com.agroventas.apiagroventas.ws.users.repository;

import com.agroventas.apiagroventas.RootEntity;
import com.agroventas.apiagroventas.ws.users.models.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProcessRepository extends JpaRepository<RootEntity, Integer> {
    @Query(value = "SELECT * FROM fnIngresoProducto(:ruc)", nativeQuery = true)
    TicketResponse genTicket(@Param("ruc") String ruc);

    @Query(value = "SELECT * FROM fnStateProd()", nativeQuery = true)
    List<StatesResponse> getStates();

    @Query(value = "SELECT * FROM fnvarietyprod()", nativeQuery = true)
    List<VarietyResponse> getVariety();

    @Query(value = "SELECT * FROM fnContainerProd()", nativeQuery = true)
    List<RecipeResponse> getRecipes();

    @Query(value = "SELECT * FROM fnPesajeProducto(:romanatecod, :varid, :staid, :rate, :pcid, :psid, :prid, :dscr, :cant, :recid, :precid)")
    PesajeResponse prcPesaje();
}
