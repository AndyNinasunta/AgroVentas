/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package wsAgroVentas;

import java.sql.SQLException;

/**
 *
 * @author jeyso
 */
public class wUsuarios {

    conexion cc = new conexion();

    public String prcLogin(String us, String ps) {
        String qry = "SELECT * FROM fnLogin ('" + us + "', '" + ps + "')";
        String dataResp = cc.getRecordsInJson(qry);
        return dataResp;
    }

    public String prcRegCliente(String nm, String dr, String ruc,
            String ml, String tl) throws SQLException {
        String fin = "";
        String vrf = "select * from fnVerificaCliente ('" + ruc + "')";
        String qry = "select * from fnRegistrarCliente ('" + nm + "', '" + dr
                + "', '" + ruc + "', '" + ml + "', '" + tl + "')";
        String val = cc.getRecordsInJson(vrf);
        if ("Registrar".equals(val)) {
            
            fin = cc.getRecordsInJson(qry);
        } else {
            fin = cc.getRecordsInJson(qry);
        }
        return fin;
    }

    public String prcDataCliente(String ruc) {
        String qry = "select * from fnObtenerDatosCliente ('" + ruc + "')";
        String dataCliente = cc.getRecordsInJson(qry);
        return dataCliente;
    }
    
    
    
    
}
