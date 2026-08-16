package com.deltapgt.backend.controller;

import java.util.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import com.deltapgt.backend.dto.SignupDto;
import com.deltapgt.backend.entity.User;
import com.deltapgt.backend.service.UserService;
import com.deltapgt.backend.dto.LoginDto;


@RestController
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody SignupDto signup){
        User user=userService.signup(signup);
        return ResponseEntity.status(HttpStatus.ACCEPTED).body(Map.of("signupsuccessfull",user));
        
    }

    @PostMapping("/login")
    public ResponseEntity<?>login(@RequestBody LoginDto login){
        String response=userService.login(login);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }
    
}
