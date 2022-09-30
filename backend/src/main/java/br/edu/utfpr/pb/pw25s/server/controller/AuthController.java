package br.edu.utfpr.pb.pw25s.server.controller;

import javax.validation.Valid;
import br.edu.utfpr.pb.pw25s.server.config.security.AuthService;
import br.edu.utfpr.pb.pw25s.server.config.security.JwtTokenService;
import br.edu.utfpr.pb.pw25s.server.dto.UserDTO;
import br.edu.utfpr.pb.pw25s.server.model.requestModel.UserRequest;
import br.edu.utfpr.pb.pw25s.server.service.UserCRUDService;
import org.modelmapper.ModelMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/authorization")
public class AuthController {

    private final UserCRUDService userCRUDService;
    private final ModelMapper modelMapper;
    private final AuthService authService;
    private final AuthenticationManager authenticationManager;
    private final PasswordEncoder encoder;
    private final JwtTokenService jwtTokenService;

    public AuthController(JwtTokenService jwtTokenService, UserCRUDService userCRUDService, AuthService authService, AuthenticationManager authenticationManager, PasswordEncoder encoder){
        this.jwtTokenService = jwtTokenService;
        this.userCRUDService = userCRUDService;
        this.authService = authService;
        this.authenticationManager = authenticationManager;
        this.encoder = encoder;
        this.modelMapper = new ModelMapper();
    }

    @PostMapping("/login")
    public ResponseEntity<?> getUser(@Valid @RequestBody UserRequest userLogin) {

        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(userLogin.getUsername(), userLogin.getPassword()));
        SecurityContextHolder.getContext().setAuthentication(authentication);

        return ResponseEntity.ok(jwtTokenService.generateJwtToken(authentication));
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerNewUser(@Valid @RequestBody UserRequest newUser) {

        UserDTO dto = modelMapper.map(newUser, UserDTO.class);

        if(userCRUDService.add(dto) != null){
            return ResponseEntity.ok("Registrado com sucesso, agora você pode realizar o login!");
        };

        return ResponseEntity.ok("Algo de errado aconteceu ao tentar registrar o usuário, tente novamente");
    }
}