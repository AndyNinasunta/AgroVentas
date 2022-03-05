package wsAgroVentas;

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

import java.beans.Statement;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;
import javax.swing.table.DefaultTableModel;

public class conexion {

    public static Connection cnn;
    public static PreparedStatement ps;
    public static ResultSet rs;
    Statement Sentencia;
    
    ResultSet DataSet;
    public static java.sql.Statement st = null;

    public static Connection AbrirConexion() {
        String cadena = "jdbc:postgresql://190.15.134.7:7070/agroventas2022";
        String usuario = "appdist_spa2021";
        String clave = "@Aplicaciones@Distribuidas@SPA@2021";
        try {
            Class.forName("org.postgresql.Driver");
            cnn = DriverManager.getConnection(cadena,usuario, clave);
            java.sql.Statement State = cnn.createStatement();

        } catch (ClassNotFoundException e) {
            //JOptionPane.showMessageDialog(null, "No se encontró la clase para conectar a Base de datos!", "", JOptionPane.CLOSED_OPTION, null);
        } catch (SQLException e) {
            //JOptionPane.showMessageDialog(null, e.getMessage(), "", JOptionPane.CLOSED_OPTION, null);
        } finally {
            // JOptionPane.showMessageDialog(null,"Conexion Exitosa");
            return cnn;
        }
    }

    private static boolean CerrarConexion() {
        try {
            cnn.close();
            cnn = null;
            return true;
        } catch (SQLException a) {
            //JOptionPane.showMessageDialog(null, a.getMessage());
            return false;
        }
    }
    /***
     * 
     * @param Cadena 
     */
    public void EjecutarSQL(String Cadena) {

        conexion.AbrirConexion();
        try {
            java.sql.Statement consulta;
            consulta = conexion.cnn.createStatement();
            consulta.execute(Cadena);
        } catch (SQLException e) {
            //JOptionPane.showMessageDialog(null, e);
            System.out.println("Error: "+ e.toString());
        }
        conexion.CerrarConexion();
    }

    public Object[] vector(String cadena) throws SQLException {
        Object[] vect = null;
        int i = 1;
        int j = 0;
        conexion.AbrirConexion();
        try {
            java.sql.Statement consulta;
            consulta = conexion.cnn.createStatement();
            ResultSet res = consulta.executeQuery(cadena);
            String calc_row = "select count(*) from(" + cadena + ") as A";
            vect = new String[Integer.parseInt(Registro(calc_row))];
            System.out.println("datos");
            while (res.next()) {
                vect[j] = res.getObject(i);

                System.out.println(res.getObject(i));
                j++;
                i++;
            }
        } catch (SQLException e) {
        }
        return vect;

    }

    public String getRecordsInJson(String sentency) {
        String resul = "[";
        DefaultTableModel table;
        try {
            table = returnRecord(sentency);

            if (table != null) {
                int columCount = table.getColumnCount();
                for (int row = 0; row < table.getRowCount(); row++) {
                    String line = "";
                    for (int colum = 0; colum < columCount; colum++) {
                        line += "\"" + table.getColumnName(colum).trim() + "\":\"" + table.getValueAt(row, colum).toString().trim() + "\"";
                        if (colum < columCount - 1) {
                            line += ",";
                        }
                    }
                    if (line.length() > 0) {
                        resul += "{" + line + "}";
                        if (row < table.getRowCount() - 1) {
                            resul += ",";
                        }
                    }
                }
                resul += "]";
                
            } else {
                resul = "[]";
            }
        } catch (SQLException ex) {
            System.out.print("Error: " + ex);

        }
        return resul;
    }
    
    public String getRecordsInJsonObject(String sentency) {
        String resul = "[";
        DefaultTableModel table;
        try {
            table = returnRecord(sentency);

            if (table != null) {
                int columCount = table.getColumnCount();
                for (int row = 0; row < table.getRowCount(); row++) {
                    String line = "";
                    for (int colum = 0; colum < columCount; colum++) {
                        line += "\"" + table.getColumnName(colum).trim() + "\":\"" + table.getValueAt(row, colum).toString().trim() + "\"";
                        if (colum < columCount - 1) {
                            line += ",";
                        }
                    }
                    if (line.length() > 0) {
                        resul += "{" + line + "}";
                        if (row < table.getRowCount() - 1) {
                            resul += ",";
                        }
                    }
                }
                resul += "]";
                resul="{\"data\":"+resul+"}";
            } else {
                resul = "[]";
            }
        } catch (SQLException ex) {
            System.out.print("Error: " + ex);

        }
        
        return resul;
    }
    
    public String getJsonMessage(String status, String information, String data) {
        return "{\"status\":" + status + ",\"information\":\"" + information + "\",\"data\":" + data + "}";
    }
    public DefaultTableModel returnRecord(String sentecy) throws SQLException {
        DefaultTableModel dtm = new DefaultTableModel();
        try {
            st = AbrirConexion().createStatement();
            rs = st.executeQuery(sentecy);

            ResultSetMetaData rsmd = rs.getMetaData();
            int n = rsmd.getColumnCount();
            for (int i = 1; i <= n; i++) {
                dtm.addColumn(rsmd.getColumnName(i));
            }
            String[] row = new String[n];
            while (rs.next()) {
                for (int i = 0; i < n; i++) {
                    row[i] = (rs.getString(rsmd.getColumnName(i + 1)) == null) ? "" : rs.getString(rsmd.getColumnName(i + 1));
                }
                dtm.addRow(row);
            }
        } catch (Exception exc) {
            System.out.println("Error return Record:" + exc.getMessage());
            dtm = new DefaultTableModel();
        } finally {
            if (rs != null) {
                rs.close();

            }
            if (st != null) {
                st.close();
            }
        };
        CerrarConexion();
        return dtm;
    }

    public String Registro(String Cadena) throws SQLException {
        String X = null;

        conexion.AbrirConexion();
        //try{
        Connection conext = AbrirConexion();
        java.sql.Statement state = conext.createStatement(ResultSet.TYPE_SCROLL_SENSITIVE, ResultSet.CONCUR_READ_ONLY);
        ResultSet result = state.executeQuery(Cadena);
        //try () 
        //{
        try {
            if (result.next() == false) {

            } else {
                X = result.getString(1);
            }
        } catch (Exception ex) {
            X = "Error: " + X;
        }
        //}

        state.close();
        // }
        // catch(SQLException e)
        //{
        // JOptionPane.showMessageDialog(null,e);
        // }
        conexion.CerrarConexion();
        return X;
    }

    public String CargarTable_3Botones(String consulta, String classTh, String classTd, String classTr,
            String nBtn1, String nBtn2, String nBtn3,
            String classnBtn1, String classnBtn2, String classnBtn3, String idTabla //, String ActnBtn1, String ActnBtn2, String ActnBtn3
    ) throws SQLException {
        String estr_tabla = "<table class = \"" + idTabla + "\" cellspacing=\"3\">";
        String dt_enc_tabla = "<Thead><tr class=\"" + classTr + "\">";
        String body_tabla = "<tboby>";
        String filas_tabla = "<tr>";
        Connection conext = AbrirConexion();
        //try () {
        java.sql.Statement state = conext.createStatement();
        ResultSet result = state.executeQuery(consulta);
        ResultSetMetaData resultMD = result.getMetaData();
        int cantColumns = resultMD.getColumnCount();
        for (int i = 1; i <= cantColumns; i++) {
            dt_enc_tabla = dt_enc_tabla + "<th  class=\"" + classTh + "\">" + (resultMD.getColumnLabel(i)) + "</th>";
        }
        dt_enc_tabla = dt_enc_tabla + "<th class=\"acciones\" colspan=\"3\">Acciones</th> </tr></thead>";

        while (result.next()) {
            Object[] row = new Object[cantColumns];
            for (int i = 0; i < cantColumns; i++) {
                filas_tabla = filas_tabla + "<td class=\"" + classTd + "\">" + result.getObject(i + 1) + "</td>";
            }
            filas_tabla = filas_tabla + "<td> <input type = \"button\" id=\"btn" + nBtn1 + "\" value = \"" + nBtn1 + "\"/></td>";
            filas_tabla = filas_tabla + "<td> <input type = \"button\" id=\"btn" + nBtn2 + "\" value = \"" + nBtn2 + "\"/></td>";
            filas_tabla = filas_tabla + "<td> <input type = \"button\" id=\"btn" + nBtn3 + "\" value = \"" + nBtn3 + "\"></td>";
            filas_tabla = filas_tabla + "</tr>";
            dt_enc_tabla = dt_enc_tabla + "</tr>";
        }
        estr_tabla = estr_tabla + dt_enc_tabla + body_tabla + filas_tabla + "</tbody></table>";
        result.close();
        conext.close();
        state.close();
        System.out.println(estr_tabla);
        return estr_tabla;

    }

    public String CargarTable_2Botones(String consulta, String classTh, String classTd, String classTr,
            String nBtn1, String nBtn2,
            String classnBtn1, String classnBtn2, String idTabla //, String ActnBtn1, String ActnBtn2, String ActnBtn3
    ) throws SQLException {
        String estr_tabla = "<table class = \"" + idTabla + "\" cellspacing=\"3\">";
        String dt_enc_tabla = "<Thead><tr class=\"" + classTr + "\">";
        String body_tabla = "<tboby>";
        String filas_tabla = "<tr>";
        Connection conext = AbrirConexion();
        //try () {
        java.sql.Statement state = conext.createStatement();
        ResultSet result = state.executeQuery(consulta);
        ResultSetMetaData resultMD = result.getMetaData();
        int cantColumns = resultMD.getColumnCount();
        for (int i = 1; i <= cantColumns; i++) {
            dt_enc_tabla = dt_enc_tabla + "<th  class=\"" + classTh + "\">" + (resultMD.getColumnLabel(i)) + "</th>";
        }
        dt_enc_tabla = dt_enc_tabla + "<th class=\"acciones\" colspan=\"2\">Acciones</th> </tr></thead>";

        while (result.next()) {
            Object[] row = new Object[cantColumns];
            for (int i = 0; i < cantColumns; i++) {
                filas_tabla = filas_tabla + "<td class=\"" + classTd + "\">" + result.getObject(i + 1) + "</td>";
            }
            filas_tabla = filas_tabla + "<td> <input type = \"button\" id=\"btn" + nBtn1 + "\" value = \"" + nBtn1 + "\"/></td>";
            filas_tabla = filas_tabla + "<td> <input type = \"button\" id=\"btn" + nBtn2 + "\" value = \"" + nBtn2 + "\"/></td>";
            filas_tabla = filas_tabla + "</tr>";
            dt_enc_tabla = dt_enc_tabla + "</tr>";
        }
        estr_tabla = estr_tabla + dt_enc_tabla + body_tabla + filas_tabla + "</tbody></table>";
        result.close();
        conext.close();
        state.close();
        System.out.println(estr_tabla);
        return estr_tabla;

    }

    
    public String insertSolicitudS(String datos) {
        ResultSet rs = null;
        java.sql.Statement st = null;
        try {
            st = AbrirConexion().createStatement();
            String consulta = datos;
            rs = st.executeQuery(consulta);
            rs.next();
            return rs.getString(1);
        } catch (Exception e) {
            System.err.print("ERROR" + e);

        } finally {
            try {
                if (AbrirConexion() != null) {
                    AbrirConexion().close();
                }
            } catch (Exception e) {
                System.err.println("ERROR" + e);
            }
        }
        return "No";
    } 
    
    
    public int insertSolicitud(String datos) {
        ResultSet rs = null;
        java.sql.Statement st = null;
        try {
            st = AbrirConexion().createStatement();
            String consulta = datos;
            rs = st.executeQuery(consulta);
            rs.next();
            return rs.getInt(1);
        } catch (Exception e) {
            System.err.print("ERROR" + e);

        } finally {
            try {
                if (AbrirConexion() != null) {
                    AbrirConexion().close();
                }
            } catch (Exception e) {
                System.err.println("ERROR" + e);
            }
        }
        return -1;
    }        
    
}
