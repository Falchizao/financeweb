package br.edu.utfpr.pb.pw25s.server.model;

import br.edu.utfpr.pb.pw25s.server.enums.TransactionType;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToOne;
import java.math.BigDecimal;
import java.util.Date;

@Entity(name = "tb_movimentation")
public class Movimentation {

    @Id
    @GeneratedValue
    private Long id;

    @Getter
    @Setter
    @OneToOne
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
    @OneToOne
    private Category category;

    @Getter
    @Setter
    private String description;

    @Getter
    @Setter
    private TransactionType type;
}
