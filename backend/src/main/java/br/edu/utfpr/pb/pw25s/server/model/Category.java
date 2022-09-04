package br.edu.utfpr.pb.pw25s.server.model;

import br.edu.utfpr.pb.pw25s.server.generic.IModel;
import lombok.Getter;
import lombok.Setter;
import javax.persistence.Entity;

@Entity(name = "tb_category")
public class Category extends IModel {

    @Getter
    @Setter
    private String name;
}
