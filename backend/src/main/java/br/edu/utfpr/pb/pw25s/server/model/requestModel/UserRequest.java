package br.edu.utfpr.pb.pw25s.server.model.requestModel;

import lombok.Getter;
import lombok.Setter;
import javax.validation.constraints.NotNull;

public class UserRequest {

    @NotNull
    @Getter
    @Setter
    private String username;

    @Getter
    @Setter
    private String displayName;

    @NotNull
    @Getter
    @Setter
    private String password;
}
