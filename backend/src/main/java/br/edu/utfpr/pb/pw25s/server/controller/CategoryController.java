package br.edu.utfpr.pb.pw25s.server.controller;

import br.edu.utfpr.pb.pw25s.server.generic.IController;
import br.edu.utfpr.pb.pw25s.server.model.requestModel.CategoryRequest;
import br.edu.utfpr.pb.pw25s.server.model.requestModel.CategoryResponse;
import br.edu.utfpr.pb.pw25s.server.service.CategoryCRUDService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/category")
public class CategoryController extends IController <CategoryResponse, ResponseEntity<?>, CategoryRequest>  {

    private final CategoryCRUDService categoryService;

    public CategoryController(CategoryCRUDService categoryService) {
        this.categoryService = categoryService;
    }

    @Override
    public ResponseEntity<List<CategoryResponse>> getAll() {
        return null;
    }

    @Override
    public ResponseEntity<Optional<CategoryResponse>> getById(Long id) {
        return null;
    }

    @Override
    public ResponseEntity<CategoryResponse> add(CategoryRequest model) {
        return null;
    }

    @Override
    public ResponseEntity<?> delete(Long id) {
        return null;
    }

    @Override
    public ResponseEntity<CategoryResponse> update(CategoryRequest model, Long id) {
        return null;
    }
}
