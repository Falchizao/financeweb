package br.edu.utfpr.pb.pw25s.server.model;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity(name = "tb_user")
public class User {
    @Id
    @GeneratedValue
    private Long id;

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
