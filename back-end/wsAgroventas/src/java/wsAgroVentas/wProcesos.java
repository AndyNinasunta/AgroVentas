/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package wsAgroVentas;

/**
 *
 * @author jeyso
 */
public class wProcesos {

    conexion cc = new conexion();

    public String cargarEstado() {
        String qry = "select * from fnStateProd()";
        String data = cc.getRecordsInJson(qry);
        return data;
    }

    public String cargarVariedad() {
        String qry = "select * from fnvarietyprod()";
        String data = cc.getRecordsInJson(qry);
        return data;
    }

    public String cargarRecipientes() {
        String qry = "select * from fnContainerProd()";
        String data = cc.getRecordsInJson(qry);
        return data;
    }

    public String prcTicket(String ruc) {
        String qry = "select * from fnIngresoProducto('"+ruc+"')";
        String data = cc.getRecordsInJson(qry);
        return data;
    }
    
        
    public String prcPesaje(String romanatecod, int variedadid,
            int estadoid,  double calificacion, 
            double precio, int pesador,
            int productoid, String detalle, double cantidad, 
            int recipienteid, double pesorecipiente){
        String qry = "select * from fnPesajeProducto('"+romanatecod+"',"+variedadid+
               ","+ estadoid+","+calificacion+","+precio+","+pesador
                +","+productoid+",'"+detalle+"',"+cantidad+","+recipienteid+","+pesorecipiente+")";
        String data = cc.getRecordsInJson(qry);
        return data;
    }
    
    
    
    
}
