package br.edu.utfpr.pb.pw25s.server.model;

import br.edu.utfpr.pb.pw25s.server.generic.IModel;
import br.edu.utfpr.pb.pw25s.server.validation.UniqueUsername;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Getter;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;

import javax.persistence.Entity;
import javax.persistence.Transient;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.Collection;

@Entity(name = "tb_user")
public class User extends IModel {

    @NotNull
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


    @Transient
    @JsonIgnore
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return AuthorityUtils.createAuthorityList("Role_USER");
    }

}
