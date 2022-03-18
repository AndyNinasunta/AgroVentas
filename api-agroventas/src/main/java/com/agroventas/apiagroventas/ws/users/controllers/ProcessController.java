package com.agroventas.apiagroventas.ws.users.controllers;

import com.agroventas.apiagroventas.ws.users.models.*;
import com.agroventas.apiagroventas.ws.users.services.ProcessService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/v1/process")
@CrossOrigin("*")
public class ProcessController {
    private final ProcessService processService;

    public ProcessController(ProcessService processService) {
        this.processService = processService;
    }

    @RequestMapping(value = "wTicket", method = RequestMethod.GET)
    public TicketResponse genTicket(@RequestParam String Ruc){
        return processService.genTicket(Ruc);
    }

    @RequestMapping(value = "wStates", method = RequestMethod.GET)
    public List<StatesResponse> getStates(){
        return processService.getStates();
    }

    @RequestMapping(value = "wVarietys", method = RequestMethod.GET)
    public List<VarietyResponse> getVarietys(){
        return processService.getVarietys();
    }

    @RequestMapping(value = "wRecipes", method = RequestMethod.GET)
    public List<RecipeResponse> getRecipes(){
        return processService.getRecipes();
    }

    @RequestMapping(value = "wPesaje", method = RequestMethod.POST)
    public PesajeResponse prcPesaje(@RequestBody PesajeRequest request){
        return processService.prcPesaje(request);
    }

    @RequestMapping(value = "wTicketData", method = RequestMethod.GET)
    public TicketDataResponse getTicketData(@RequestParam String idticket){
        return processService.getTicketData(idticket);
    }

    @RequestMapping(value = "wPendTickets", method = RequestMethod.GET)
    public List<ListTicketsResponse> getPendTickets(){
        return processService.getPendTickets();
    }

    @RequestMapping(value = "wInvalidateTicket", method = RequestMethod.GET)
    public InvalidateTicketResponse invalidateTicket(@RequestParam String idticket){
        return processService.invalidateTicket(idticket);
    }

    @RequestMapping(value = "wPayCash", method = RequestMethod.POST)
    public PayCashResponse payCash(@RequestBody PayCashRequest request){
        return processService.payCash(request);
    }

    @MessageMapping("wSensor")
    @SendTo("/realtime/sensors")
    public SensorInfo sensorInfo(SensorInfo message){
        System.out.println("Recibido " + message.toString());
        return message;
    }
}
