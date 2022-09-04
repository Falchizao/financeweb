package br.edu.utfpr.pb.pw25s.server.model;

import br.edu.utfpr.pb.pw25s.server.enums.AccountType;
import br.edu.utfpr.pb.pw25s.server.generic.IModel;
import lombok.Getter;
import lombok.Setter;
import javax.persistence.Entity;
import javax.persistence.OneToOne;

@Entity(name = "tb_account")
public class Account extends IModel {

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
