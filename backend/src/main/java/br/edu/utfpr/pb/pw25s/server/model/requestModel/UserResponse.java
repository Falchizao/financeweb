package br.edu.utfpr.pb.pw25s.server.model.requestModel;

import lombok.Getter;
import lombok.Setter;

public class UserResponse {

    @Getter
    @Setter
    private String username;

    @Getter
    @Setter
    private String displayName;
}
