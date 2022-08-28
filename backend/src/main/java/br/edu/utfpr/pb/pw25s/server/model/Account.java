package br.edu.utfpr.pb.pw25s.server.model;

import br.edu.utfpr.pb.pw25s.server.enums.AccountType;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToOne;

@Entity(name = "tb_account")
public class Account {

    @Id
    @GeneratedValue
    private Long id;

    @Getter
    @Setter
    @OneToOne
    private User user;

    @Getter
    @Setter
    private Long code;

    @Getter
    @Setter
    private String bank_branch;

    @Getter
    @Setter
    private String bank;

    @Getter
    @Setter
    private AccountType type;

}
