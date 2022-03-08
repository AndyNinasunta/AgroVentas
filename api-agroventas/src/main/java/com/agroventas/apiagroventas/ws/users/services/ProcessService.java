package com.agroventas.apiagroventas.ws.users.services;

import com.agroventas.apiagroventas.ws.users.models.StatesResponse;
import com.agroventas.apiagroventas.ws.users.models.TicketResponse;
import com.agroventas.apiagroventas.ws.users.models.VarietyResponse;
import com.agroventas.apiagroventas.ws.users.repository.ProcessRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProcessService {
    private final ProcessRepository processRepository;

    public ProcessService(ProcessRepository processRepository) {
        this.processRepository = processRepository;
    }

    public TicketResponse genTicket(String ruc){
        return processRepository.genTicket(ruc);
    }

    public List<StatesResponse> getStates(){
        return processRepository.getStates();
    }

    public List<VarietyResponse> getVarietys(){
        return processRepository.getVariety();
    }
}
