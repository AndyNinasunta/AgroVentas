package com.agroventas.apiagroventas.ws.users.controllers;

import com.agroventas.apiagroventas.ws.users.models.RecipeResponse;
import com.agroventas.apiagroventas.ws.users.models.StatesResponse;
import com.agroventas.apiagroventas.ws.users.models.TicketResponse;
import com.agroventas.apiagroventas.ws.users.models.VarietyResponse;
import com.agroventas.apiagroventas.ws.users.services.ProcessService;
import org.springframework.web.bind.annotation.*;

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


}
