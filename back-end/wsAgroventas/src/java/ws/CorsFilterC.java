/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package ws;

import javax.ws.rs.core.Feature;
import javax.ws.rs.core.FeatureContext;
import javax.ws.rs.ext.Provider;
import org.apache.catalina.filters.CorsFilter;

/**
 *
 * @author josedev
 */
@Provider
public class CorsFilterC implements Feature{
     @Override
  public boolean configure(FeatureContext context) {
    CorsFilter corsFilter = new CorsFilter();
    corsFilter.getAllowedOrigins().add("*");
    context.register(corsFilter);
    return true;
 }
}
