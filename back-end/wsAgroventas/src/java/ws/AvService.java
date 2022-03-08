/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package ws;

import java.sql.SQLException;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.UriInfo;
import javax.ws.rs.Consumes;
import javax.ws.rs.Produces;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PUT;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.Response;
import wsAgroVentas.wProcesos;
import wsAgroVentas.wUsuarios;

/**
 * REST Web Service
 *
 * @author jeyso
 */
@Consumes(javax.ws.rs.core.MediaType.APPLICATION_JSON)
@Produces(javax.ws.rs.core.MediaType.APPLICATION_XML)
@Path("avService")
public class AvService {
    wUsuarios pUser;
    wProcesos pProc;
    
    @Context
    private UriInfo context;

    /**
     * Creates a new instance of AvService
     */
    public AvService() {
         pUser = new wUsuarios();
         pProc = new wProcesos();
    }

    /**
     * Retrieves representation of an instance of ws.AvService
     * @return an instance of java.lang.String
     */
    @GET
    @Path("wLogin")
    public Response wLogin(@QueryParam("us") String us, @QueryParam("ps") String ps) throws SQLException {        
        String dataLog = pUser.prcLogin(us, ps);
        System.out.println(dataLog);
       
        
<<<<<<< HEAD
        return Response.ok(dataLog)
                .header("Access-Control-Allow-Origin", "*")
                .header("Access-Control-Allow-Methods", "POST, GET, PUT, UPDATE, OPTIONS")
                .header("Access-Control-Allow-Headers", "Content-Type, Accept, X-Requested-with")
                .header("Access-Control-Max-Age", "3600")
                .build();        
=======
        return Response.ok(dataLog).build();        
>>>>>>> jsolorzano
    }
    
    @POST
    @Path("wRegistrar")
    public Response wRegistrar(@QueryParam("NomR") String NomR, @QueryParam("DirR")String DirR,
            @QueryParam("RucR") String RucR, @QueryParam("EmaR") String EmaR, 
            @QueryParam("TelR")String TelR) throws SQLException
    {
        String dataReg = pUser.prcRegCliente(NomR, DirR, 
                RucR,  EmaR,  TelR);
            
        return Response.ok(dataReg).build();  
    }
    
    @GET
    @Path("wDataClientes")
    public Response wDataClientes(@QueryParam("Ruc") String Ruc){
        String dataPac = pUser.prcDataCliente(Ruc);
        return Response.ok(dataPac).build();
    }
    @GET
    @Path("wTicket")
    public Response wTicket(@QueryParam("Ruc") String Ruc){
        String dataPac = pProc.prcTicket(Ruc);
        return Response.ok(dataPac)
                .header("Access-Control-Allow-Origin", "*")
                .header("Access-Control-Allow-Methods", "POST, GET, PUT, UPDATE, OPTIONS")
                .header("Access-Control-Allow-Headers", "Content-Type, Accept, X-Requested-with")
                .build();
    }
    
    @GET
    @Path("wVariedades")
    public Response wVariedades(){
        String dataPac = pProc.cargarVariedad();
        return Response.ok(dataPac)
                .header("Access-Control-Allow-Origin", "*")
                .header("Access-Control-Allow-Methods", "POST, GET, PUT, UPDATE, OPTIONS")
                .header("Access-Control-Allow-Headers", "Content-Type, Accept, X-Requested-with")
                .build();
    }
    
    @GET
    @Path("wEstados")
    public Response wEstados(){
        String dataPac = pProc.cargarEstado();
        return Response.ok(dataPac)
                .header("Access-Control-Allow-Origin", "*")
                .header("Access-Control-Allow-Methods", "POST, GET, PUT, UPDATE, OPTIONS")
                .header("Access-Control-Allow-Headers", "Content-Type, Accept, X-Requested-with")
                .build();
    }
    
    
    @GET
    @Path("wRecipientes")
    public Response wRecipientes(){
        String dataPac = pProc.cargarEstado();
        return Response.ok(dataPac)
                .header("Access-Control-Allow-Origin", "*")
                .header("Access-Control-Allow-Methods", "POST, GET, PUT, UPDATE, OPTIONS")
                .header("Access-Control-Allow-Headers", "Content-Type, Accept, X-Requested-with")
                .build();
    }
    
    @POST
    @Path("wPesaje")
    public Response wPesaje(@QueryParam("rcd") String rcd,@QueryParam("vid") int variedadid,
            @QueryParam("sid") int estadoid,@QueryParam("clf") double calificacion, 
            @QueryParam("prc")double precio,@QueryParam("pesid") int pesadorid,
            @QueryParam("prd") int productoid,@QueryParam("det") String detalle, 
            @QueryParam("cant") double cantidad, @QueryParam("rptid") int recipienteid, 
            @QueryParam("precip") double pesorecipiente){
        String dataPac = pProc.prcPesaje(rcd, variedadid, estadoid, calificacion, 
                precio, pesadorid, productoid, detalle, cantidad, recipienteid, pesorecipiente);
        return Response.ok(dataPac)
                .header("Access-Control-Allow-Origin", "*")
                .header("Access-Control-Allow-Methods", "POST, GET, PUT, UPDATE, OPTIONS")
                .header("Access-Control-Allow-Headers", "Content-Type, Accept, X-Requested-with")
                .build();
    }
}
