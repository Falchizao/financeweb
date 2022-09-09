package br.edu.utfpr.pb.pw25s.server.model.requestModel;

import br.edu.utfpr.pb.pw25s.server.enums.TransactionType;
import br.edu.utfpr.pb.pw25s.server.model.Account;
import br.edu.utfpr.pb.pw25s.server.model.Category;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.OneToOne;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.math.BigDecimal;
import java.util.Date;

public class MovimentationRequest {

    @NotNull
    @Getter
    @Setter
    @OneToOne
    private Account account;

    @NotNull
    @Getter
    @Setter
    private BigDecimal value;

    @NotNull
    @Getter
    @Setter
    private Date due_date;

    @Getter
    @Setter
    private BigDecimal paidValue;

    @Getter
    @Setter
    private Date paymentDate;

    @NotNull
    @Getter
    @Setter
    @OneToOne
    private Category category;

    @NotNull
    @Getter
    @Setter
    @Size(min = 4, max = 255)
    private String description;

    @NotNull
    @Getter
    @Setter
    private TransactionType type;
}
