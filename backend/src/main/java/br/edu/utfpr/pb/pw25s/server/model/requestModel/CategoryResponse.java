package br.edu.utfpr.pb.pw25s.server.model.requestModel;

import lombok.Getter;
import lombok.Setter;

public class CategoryResponse {

    @Setter
    @Getter
    private Long id;

    @Getter
    @Setter
    private String name;
}
