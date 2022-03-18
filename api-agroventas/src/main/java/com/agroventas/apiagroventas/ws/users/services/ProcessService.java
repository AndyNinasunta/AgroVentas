package com.agroventas.apiagroventas.ws.users.services;

import com.agroventas.apiagroventas.ws.users.models.*;
import com.agroventas.apiagroventas.ws.users.repository.ProcessRepository;
import org.springframework.data.history.Revision;
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

    public PesajeResponse prcPesaje(PesajeRequest pesaje){
        return processRepository.prcPesaje(pesaje);
    }

    public List<RecipeResponse> getRecipes(){
        return processRepository.getRecipes();
    }

    public TicketDataResponse getTicketData(String idticket){
        return processRepository.getTicketData(idticket);
    }

    public List<ListTicketsResponse> getPendTickets(){
        return processRepository.getPendsTickets();
    }

    public InvalidateTicketResponse invalidateTicket(String idticket){
        return processRepository.invalidateTicket(idticket);
    }

    public PayCashResponse payCash(PayCashRequest pay){
        return processRepository.payCash(pay);
    }

}
