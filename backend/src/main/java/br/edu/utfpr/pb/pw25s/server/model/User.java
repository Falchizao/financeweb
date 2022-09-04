package br.edu.utfpr.pb.pw25s.server.model;

import br.edu.utfpr.pb.pw25s.server.generic.IModel;
import br.edu.utfpr.pb.pw25s.server.validation.UniqueUsername;
import lombok.Getter;
import lombok.Setter;
import javax.persistence.Entity;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Entity(name = "tb_user")
public class User extends IModel {

    @NotNull
    @UniqueUsername
    @Size(min = 4, max = 255)
    @Getter
    @Setter
    private String username;

    @Getter
    @Setter
    @NotNull
    private String displayName;

    @NotNull
    @Size(min = 4, max = 255)
    @Getter
    @Setter
    private String password;
}
