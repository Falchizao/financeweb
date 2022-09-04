package br.edu.utfpr.pb.pw25s.server.service;

import br.edu.utfpr.pb.pw25s.server.dto.UserDTO;
import br.edu.utfpr.pb.pw25s.server.generic.IService;
import br.edu.utfpr.pb.pw25s.server.model.User;
import br.edu.utfpr.pb.pw25s.server.repository.UserRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserCRUDService extends IService<UserDTO> {

    private final UserRepository userRepository;
    BCryptPasswordEncoder encoder;

    public UserCRUDService(UserRepository userRepository) {
        this.userRepository = userRepository;
        encoder = new BCryptPasswordEncoder();
    }

    public User save(User user){
        user.setPassword(encoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

    @Override
    public List<UserDTO> getAll() {
        return null;
    }

    @Override
    public Optional<UserDTO> getById(Long id) {
        return Optional.empty();
    }

    @Override
    public UserDTO add(UserDTO model) {
        return null;
    }

    @Override
    public void delete(Long id) {

    }

    @Override
    public UserDTO update(UserDTO model, Long id) {
        return null;
    }
}
