package com.agroventas.apiagroventas.ws.users.services;

import com.agroventas.apiagroventas.ws.users.models.TicketResponse;
import com.agroventas.apiagroventas.ws.users.repository.ProcessRepository;
import org.springframework.stereotype.Service;

@Service
public class ProcessService {
    private final ProcessRepository processRepository;

    public ProcessService(ProcessRepository processRepository) {
        this.processRepository = processRepository;
    }

    public TicketResponse genTicket(String ruc){
        return processRepository.genTicket(ruc);
    }
}
