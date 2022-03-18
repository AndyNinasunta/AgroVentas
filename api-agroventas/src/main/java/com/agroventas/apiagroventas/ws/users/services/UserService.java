package com.agroventas.apiagroventas.ws.users.services;

import com.agroventas.apiagroventas.ws.users.models.DataClienteResponse;
import com.agroventas.apiagroventas.ws.users.models.LoginResponse;
import com.agroventas.apiagroventas.ws.users.models.RegClienteResponse;
import com.agroventas.apiagroventas.ws.users.repository.UserRepository;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public LoginResponse userLogin(String user, String pass){
        return userRepository.loginUser(user, pass);
    }

    public String verUser(String ruc){
        return userRepository.verifUser(ruc);
    }

    public RegClienteResponse regUser(String name, String dir, String ruc, String email, String cell){
        return userRepository.regUser(name, dir, ruc, email, cell);
    }

    public DataClienteResponse dataClient(String ruc){
        return userRepository.dataClient(ruc);
    }
}
