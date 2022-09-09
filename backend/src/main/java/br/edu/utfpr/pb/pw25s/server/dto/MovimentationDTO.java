package br.edu.utfpr.pb.pw25s.server.dto;

import br.edu.utfpr.pb.pw25s.server.enums.TransactionType;
import br.edu.utfpr.pb.pw25s.server.model.Account;
import br.edu.utfpr.pb.pw25s.server.model.Category;
import lombok.Getter;
import lombok.Setter;
import java.math.BigDecimal;
import java.util.Date;

public class MovimentationDTO {

    @Getter
    @Setter
    private Account account;

    @Getter
    @Setter
    private BigDecimal value;

    @Getter
    @Setter
    private Date due_date;

    @Getter
    @Setter
    private BigDecimal paidValue;

    @Getter
    @Setter
    private Date paymentDate;

    @Getter
    @Setter
    private Category category;

    @Getter
    @Setter
    private String description;

    @Getter
    @Setter
    private TransactionType type;
}
