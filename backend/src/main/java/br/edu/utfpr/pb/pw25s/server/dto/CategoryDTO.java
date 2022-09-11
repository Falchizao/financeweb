package br.edu.utfpr.pb.pw25s.server.dto;

import lombok.Getter;
import lombok.Setter;

public class CategoryDTO {

    @Setter
    @Getter
    private Long id;

    @Getter
    @Setter
    private String name;
}
