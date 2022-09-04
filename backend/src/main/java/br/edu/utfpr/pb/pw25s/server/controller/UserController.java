package br.edu.utfpr.pb.pw25s.server.controller;

import br.edu.utfpr.pb.pw25s.server.generic.IController;
import br.edu.utfpr.pb.pw25s.server.model.User;
import br.edu.utfpr.pb.pw25s.server.model.requestModel.UserRequest;
import br.edu.utfpr.pb.pw25s.server.model.requestModel.UserResponse;
import br.edu.utfpr.pb.pw25s.server.utils.GenericResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import br.edu.utfpr.pb.pw25s.server.service.UserCRUDService;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/users")
public class UserController extends IController<UserResponse, ResponseEntity<?>, UserRequest> {

    private final UserCRUDService userCRUDService;

    public UserController(UserCRUDService userCRUDService) {
        this.userCRUDService = userCRUDService;
    }

    @PostMapping
    GenericResponse createuser(@RequestBody User user){
        userCRUDService.save(user);
        GenericResponse genericResponse = new GenericResponse();
        genericResponse.setMessage("Registro Salvo");
        return genericResponse;
    }

    @Override
    public ResponseEntity<List<UserResponse>> getAll() {
        return null;
    }

    @Override
    public ResponseEntity<Optional<UserResponse>> getById(Long id) {
        return null;
    }

    @Override
    public ResponseEntity<UserResponse> add(UserRequest model) {
        userCRUDService.save(new User());
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @Override
    public ResponseEntity<?> delete(Long id) {
        userCRUDService.delete(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @Override
    public ResponseEntity<UserResponse> update(UserRequest model, Long id) {
        return null;
    }
}
