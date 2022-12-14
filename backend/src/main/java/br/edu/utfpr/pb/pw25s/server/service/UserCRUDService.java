package br.edu.utfpr.pb.pw25s.server.service;

import br.edu.utfpr.pb.pw25s.server.dto.UserDTO;
import br.edu.utfpr.pb.pw25s.server.generic.IService;
import br.edu.utfpr.pb.pw25s.server.handler.exceptions.ObjectInvalidException;
import br.edu.utfpr.pb.pw25s.server.handler.modelException.ResourceNotFound;
import br.edu.utfpr.pb.pw25s.server.model.User;
import br.edu.utfpr.pb.pw25s.server.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Slf4j
public class UserCRUDService extends IService<UserDTO> {

    private final UserRepository userRepository;
    private final ModelMapper modelMapper;
    BCryptPasswordEncoder encoder;

    public UserCRUDService(UserRepository userRepository) {
        this.userRepository = userRepository;
        this.modelMapper = new ModelMapper();
        encoder = new BCryptPasswordEncoder();
    }

    @Override
    public List<UserDTO> getAll(String username) {
        log.info("Fetching users...");
        List<User> users = userRepository.findAll();

        return users.stream()
                .map(user -> modelMapper.map(user, UserDTO.class))
                .collect(Collectors.toList());
    }

    @Override
    public Optional<UserDTO> getById(Long id) {
        log.info("Trying to find desired user...");
        Optional<User> user = userRepository.findById(id);

        return Optional.of(modelMapper.map(user.get(), UserDTO.class));
    }

    @Override
    public UserDTO add(UserDTO dto) {
        log.info("Adding new user...");

        User user;
        try{
            user = userRepository.save(modelMapper.map(dto, User.class));
        }catch (Exception e){
            throw new ObjectInvalidException("Credenciais já utilizadas! Tente novamente com outro username e senha!");
        }

        return modelMapper.map(user, UserDTO.class);
    }

    @Override
    public void delete(Long id) {
        Optional<User> user = userRepository.findById(id);

        if(user.isEmpty()){
            throw new ResourceNotFound("User by id Not found in service!");
        }
        log.info("Deleting user...");

        userRepository.deleteById(id);
    }

    @Override
    public UserDTO update(UserDTO dto, Long id) {
        userRepository.deleteById(id);
        log.info("Updating user...");

        return modelMapper.map(userRepository.save(modelMapper.map(dto, User.class)), UserDTO.class);
    }


    public Optional<UserDTO> getByName(String name) {
        log.info("Trying to find desired user...");
        User user = userRepository.findByusername(name);

        return Optional.of(modelMapper.map(user, UserDTO.class));
    }
}
