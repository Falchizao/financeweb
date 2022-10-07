package br.edu.utfpr.pb.pw25s.server.model;

import br.edu.utfpr.pb.pw25s.server.generic.IModel;
import lombok.Getter;
import lombok.Setter;
import javax.persistence.Entity;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Entity(name = "tb_category")
@Table(uniqueConstraints = @UniqueConstraint(name = "setuniquecategory", columnNames = "name"))
public class Category extends IModel {

    @NotNull
    @Getter
    @Setter
    @Size(min = 4, max = 255)
    private String name;
}
