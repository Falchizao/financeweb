package br.edu.utfpr.pb.pw25s.server.model.requestModel;

import lombok.Getter;
import lombok.Setter;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

public class CategoryRequest {

    @NotNull
    @Getter
    @Setter
    @Size(min = 4, max = 255)
    private String name;
}
