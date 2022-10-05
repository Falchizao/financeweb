package br.edu.utfpr.pb.pw25s.server.controller;

import br.edu.utfpr.pb.pw25s.server.dto.CategoryDTO;
import br.edu.utfpr.pb.pw25s.server.generic.IController;
import br.edu.utfpr.pb.pw25s.server.model.requestModel.CategoryRequest;
import br.edu.utfpr.pb.pw25s.server.model.requestModel.CategoryResponse;
import br.edu.utfpr.pb.pw25s.server.service.CategoryCRUDService;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/category")
public class CategoryController extends IController <CategoryResponse, ResponseEntity<?>, CategoryRequest>  {

    private final CategoryCRUDService categoryService;
    private final ModelMapper modelMapper;

    public CategoryController(CategoryCRUDService categoryService) {
        this.categoryService = categoryService;
        this.modelMapper = new ModelMapper();
    }

    @Override
    public ResponseEntity<List<CategoryResponse>> getAll(HttpServletRequest httpServletRequest) {
        List<CategoryDTO> categoryList = categoryService.getAll(httpServletRequest.getUserPrincipal().getName());

        return new ResponseEntity<>(categoryList.stream()
                .map(categoryDTO -> modelMapper.map(categoryDTO, CategoryResponse.class))
                .collect(Collectors.toList()), HttpStatus.OK);
    }

    @Override
    public ResponseEntity<Optional<CategoryResponse>> getById(@PathVariable Long id) {
        Optional<CategoryDTO> dto = categoryService.getById(id);

        return new ResponseEntity<>(Optional.of(modelMapper.map(dto, CategoryResponse.class)), HttpStatus.OK);
    }

    @Override
    public ResponseEntity<CategoryResponse> add(@Valid @RequestBody CategoryRequest categoryRequest) {
        CategoryDTO dto = categoryService.add(modelMapper.map(categoryRequest, CategoryDTO.class));

        return new ResponseEntity<>(modelMapper.map(dto, CategoryResponse.class), HttpStatus.CREATED);
    }

    @Override
    public ResponseEntity<?> delete(@PathVariable Long id) {
        categoryService.delete(id);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @Override
    public ResponseEntity<CategoryResponse> update(@Valid @RequestBody CategoryRequest categoryRequest, @PathVariable Long id) {
        CategoryDTO dto = categoryService.update(modelMapper.map(categoryRequest, CategoryDTO.class), id);

        return new ResponseEntity<>(modelMapper.map(dto, CategoryResponse.class), HttpStatus.OK);
    }
}
