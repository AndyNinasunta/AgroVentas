package com.agroventas.apiagroventas.ws.users.controllers;

import com.agroventas.apiagroventas.ws.users.models.DataClienteResponse;
import com.agroventas.apiagroventas.ws.users.models.LoginResponse;
import com.agroventas.apiagroventas.ws.users.services.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Objects;

@RestController
@RequestMapping("/api/v1/user")
@CrossOrigin("*")
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @RequestMapping(value = "wLogin", method = RequestMethod.GET)
    public LoginResponse loginUser(@RequestParam String us, @RequestParam String ps){
        return userService.userLogin(us, ps);
    }

    @RequestMapping(value = "wRegistrar", method = RequestMethod.POST)
    public ResponseEntity<Object> regUser(@RequestParam String NomR, @RequestParam String DirR, @RequestParam String RucR,
                                          @RequestParam String EmaR, @RequestParam String TelR){
        String validate = userService.verUser(RucR);
        if(Objects.equals(validate, "Registrar")){
            return new ResponseEntity<Object>(userService.regUser(NomR, DirR, RucR, EmaR, TelR), HttpStatus.valueOf(200));
        }
        return new ResponseEntity<Object>(validate, HttpStatus.valueOf(200));
    }

    @RequestMapping(value = "wDataClientes", method = RequestMethod.GET)
    public DataClienteResponse loginUser(@RequestParam String Ruc){
        return userService.dataClient(Ruc);
    }
}
