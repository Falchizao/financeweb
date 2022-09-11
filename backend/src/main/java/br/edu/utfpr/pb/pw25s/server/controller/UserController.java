package br.edu.utfpr.pb.pw25s.server.controller;

import br.edu.utfpr.pb.pw25s.server.dto.UserDTO;
import br.edu.utfpr.pb.pw25s.server.generic.IController;
import br.edu.utfpr.pb.pw25s.server.model.requestModel.UserRequest;
import br.edu.utfpr.pb.pw25s.server.model.requestModel.UserResponse;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import br.edu.utfpr.pb.pw25s.server.service.UserCRUDService;
import javax.validation.Valid;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/user")
public class UserController extends IController<UserResponse, ResponseEntity<?>, UserRequest> {

    private final UserCRUDService userCRUDService;
    private final ModelMapper modelMapper;

    public UserController(UserCRUDService userCRUDService) {
        this.userCRUDService = userCRUDService;
        this.modelMapper = new ModelMapper();
    }

    @Override
    public ResponseEntity<List<UserResponse>> getAll() {
        List<UserDTO> usersDTO = userCRUDService.getAll();

        return new ResponseEntity<>(usersDTO.stream()
                .map(personDTO -> modelMapper.map(personDTO, UserResponse.class))
                .collect(Collectors.toList()), HttpStatus.OK);
    }

    @Override
    public ResponseEntity<Optional<UserResponse>> getById(Long id) {
        Optional<UserDTO> dto = userCRUDService.getById(id);

        return new ResponseEntity<>(Optional.of(modelMapper.map(dto, UserResponse.class)), HttpStatus.OK);
    }

    @Override
    public ResponseEntity<UserResponse> add(@Valid UserRequest userRequest) {
        UserDTO dto = userCRUDService.add(modelMapper.map(userRequest, UserDTO.class));

        return new ResponseEntity<>(modelMapper.map(dto, UserResponse.class), HttpStatus.CREATED);
    }

    @Override
    public ResponseEntity<?> delete(Long id) {
        userCRUDService.delete(id);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @Override
    public ResponseEntity<UserResponse> update(@Valid UserRequest userRequest, Long id) {
        UserDTO dto = userCRUDService.update(modelMapper.map(userRequest, UserDTO.class), id);

        return new ResponseEntity<>(modelMapper.map(dto, UserResponse.class), HttpStatus.OK);
    }
}
