package br.edu.utfpr.pb.pw25s.server.dto;

import lombok.Getter;
import lombok.Setter;

public class UserDTO {

    @Getter
    @Setter
    private String username;

    @Getter
    @Setter
    private String displayName;

    @Getter
    @Setter
    private String password;
}
