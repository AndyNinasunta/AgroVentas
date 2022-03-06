package com.agroventas.apiagroventas.ws.users.controllers;

import com.agroventas.apiagroventas.ws.users.models.LoginResponse;
import com.agroventas.apiagroventas.ws.users.models.TicketResponse;
import com.agroventas.apiagroventas.ws.users.services.ProcessService;
import org.springframework.web.bind.annotation.*;

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
}
