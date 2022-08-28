package br.edu.utfpr.pb.pw25s.server.controller;

import br.edu.utfpr.pb.pw25s.server.model.User;
import br.edu.utfpr.pb.pw25s.server.utils.GenericResponse;
import org.springframework.web.bind.annotation.*;
import br.edu.utfpr.pb.pw25s.server.service.UserService;

@RestController
@RequestMapping("/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping
    GenericResponse createuser(@RequestBody User user){
        userService.save(user);
        GenericResponse genericResponse = new GenericResponse();
        genericResponse.setMessage("Registro Salvo");
        return genericResponse;
    }
}
