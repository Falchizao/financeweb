package br.edu.utfpr.pb.pw25s.server.model.requestModel;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotNull;

public class UserRequest {

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
