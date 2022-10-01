package br.edu.utfpr.pb.pw25s.server.dto;

import br.edu.utfpr.pb.pw25s.server.enums.AccountType;
import br.edu.utfpr.pb.pw25s.server.model.User;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

public class AccountDTO {

    @Setter
    @Getter
    private Long id;

    @Getter
    @Setter
    private User user;

    @Getter
    @Setter
    private Long code;

    @Getter
    @Setter
    private BigDecimal balance;

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
