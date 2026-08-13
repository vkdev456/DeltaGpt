package com.deltapgt.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.deltapgt.backend.dto.LoginDto;
import com.deltapgt.backend.dto.SignupDto;
import com.deltapgt.backend.entity.User;
import com.deltapgt.backend.exception.InvalidCredentialsException;
import com.deltapgt.backend.exception.UserAlreadyExsistsException;
import com.deltapgt.backend.repository.UserRepositorty;

@Service
public class UserService {

    @Autowired
    private UserRepositorty userRepo;

    public User signup(SignupDto signup){

        User username=userRepo.getByUsername(signup.getUsername());
        if(username!=null){
            throw new UserAlreadyExsistsException("user already exists");   
        }

        User user=new User();
        user.setEmail(signup.getEmail());
        user.setPassword(signup.getPassword());
        user.setUsername(signup.getUsername());
        
        return userRepo.save(user);
    }

    public String login(LoginDto login){
           
        User username=userRepo.getByUsername(login.getUsername());
        
        if(username.getPassword().equals(login.getPassword())){
               return "loginsuccess";
        }else{
            throw new InvalidCredentialsException("Invalid Credentials");
        }

    }
    
}
