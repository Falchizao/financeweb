package br.edu.utfpr.pb.pw25s.server.config.security;

import java.util.Collection;
import br.edu.utfpr.pb.pw25s.server.model.User;
import org.modelmapper.ModelMapper;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import com.fasterxml.jackson.annotation.JsonIgnore;

public class UserDetailsImpl implements UserDetails {

    private static final long serialVersionUID = 1L;
    private String username;
    private String displayName;
    private static ModelMapper modelMapper;
    @JsonIgnore
    private String password;
    private Collection<? extends GrantedAuthority> authorities;

    public UserDetailsImpl(String username, String displayName, String password) {
        this.username = username;
        this.displayName = displayName;
        this.password = password;
        this.modelMapper = new ModelMapper();
    }

    public static UserDetailsImpl build(User user) {
        return new UserDetailsImpl(user.getUsername(), user.getUsername(), user.getPassword());
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    @Override
    public String getPassword() {
        return this.password;
    }

    @Override
    public String getUsername() {
        return this.username;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }


}