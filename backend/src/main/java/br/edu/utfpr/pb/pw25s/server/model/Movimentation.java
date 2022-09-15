package br.edu.utfpr.pb.pw25s.server.model;

import br.edu.utfpr.pb.pw25s.server.enums.TransactionType;
import br.edu.utfpr.pb.pw25s.server.generic.IModel;
import lombok.Getter;
import lombok.Setter;
import javax.persistence.Entity;
import javax.persistence.OneToOne;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.math.BigDecimal;
import java.time.LocalDate;

@Entity(name = "tb_movimentation")
public class Movimentation extends IModel {

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
    private LocalDate due_date;

    @Getter
    @Setter
    private BigDecimal paidValue;

    @Getter
    @Setter
    private LocalDate paymentDate;

    @NotNull
    @Getter
    @Setter
    @OneToOne
    private Category category;

    @Getter
    @Setter
    @Size(min = 4, max = 255)
    private String description;

    @NotNull
    @Getter
    @Setter
    private TransactionType type;
}
