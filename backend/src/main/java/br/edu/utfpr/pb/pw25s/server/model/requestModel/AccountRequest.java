package br.edu.utfpr.pb.pw25s.server.model.requestModel;

import br.edu.utfpr.pb.pw25s.server.enums.AccountType;
import br.edu.utfpr.pb.pw25s.server.model.User;
import lombok.Getter;
import lombok.Setter;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.math.BigDecimal;

public class AccountRequest {

    @NotNull
    @Getter
    @Setter
    private User user;

    @NotNull
    @Getter
    @Setter
    private Long code;

    @NotNull
    @Getter
    @Setter
    @Size(min = 4, max = 255)
    private String bank_branch;

    @NotNull
    @Getter
    @Setter
    @Size(min = 4, max = 255)
    private String bank;

    @NotNull
    @Getter
    @Setter
    private AccountType type;

    @Getter
    @Setter
    private BigDecimal balance;
}
