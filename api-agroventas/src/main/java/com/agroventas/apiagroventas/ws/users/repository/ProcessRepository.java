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
    @Query(value = "SELECT * FROM fningresoproducto(:ruc)", nativeQuery = true)
    TicketResponse genTicket(@Param("ruc") String ruc);

    @Query(value = "SELECT * FROM fnstateprod()", nativeQuery = true)
    List<StatesResponse> getStates();

    @Query(value = "SELECT * FROM fnvarietyprod()", nativeQuery = true)
    List<VarietyResponse> getVariety();

    @Query(value = "SELECT * FROM fncontainerprod()", nativeQuery = true)
    List<RecipeResponse> getRecipes();

    @Query(value = "SELECT * FROM fnpesajeproducto(:#{#pesaje.rcd}, :#{#pesaje.variedadid}, :#{#pesaje.estadoid}, cast (:#{#pesaje.calificacion} as numeric)," +
            " :#{#pesaje.pcid}, :#{#pesaje.pesadorid}, :#{#pesaje.productoid}, :#{#pesaje.detalle}, cast(:#{#pesaje.cantidad} as numeric), :#{#pesaje.recipienteid}," +
            "cast(:#{#pesaje.pesorecipiente} as numeric))", nativeQuery = true)
    PesajeResponse prcPesaje(@Param("pesaje") PesajeRequest pesaje);

    @Query(value = "SELECT * FROM fndatosclienteticket(:idticket)", nativeQuery = true)
    TicketDataResponse getTicketData(@Param("idticket") String idticket);

    @Query(value = "SELECT * FROM fnticketpendients()", nativeQuery = true)
    List<ListTicketsResponse> getPendsTickets();

    @Query(value = "SELECT * FROM fnanularticket(cast(:idticket as bigint))", nativeQuery = true)
    InvalidateTicketResponse invalidateTicket(@Param("idticket") String idticket);

    @Query(value = "SELECT * FROM fnpaycash(cast(:#{#pay.rmnid} as bigint), cast(:#{#pay.cajero} as bigint), cast(:#{#pay.payvalue} as numeric), cast(:#{#pay.paymth} as integer))", nativeQuery = true)
    PayCashResponse payCash(@Param("pay") PayCashRequest pay);

    @Query(value = "SELECT * FROM fnpesados()", nativeQuery = true)
    List<ListTicketsPayPendResponse> getWeighedTickets();

    @Query(value = "SELECT * FROM fnpendientepagoticket(:idticket) LIMIT 1", nativeQuery = true)
    TicketDataPaymentResponse getTicketDataForPayment(@Param("idticket") String idticket);

    @Query(value = "SELECT * FROM fnnoatendidos(:idnt)", nativeQuery = true)
    List<TicketsNotWeighedResponse> getNotWeighedTicketsByUser(@Param("idnt") String idnt);

    @Query(value = "SELECT * FROM fnhistoricromanate(:idnt)", nativeQuery = true)
    List<ListProcessedTicletsHistoryByUserResponse> getProcessedTicketsByUser(@Param("idnt") String idnt);
}
