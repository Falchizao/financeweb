package br.edu.utfpr.pb.pw25s.server.service;

import br.edu.utfpr.pb.pw25s.server.dto.CategoryDTO;
import br.edu.utfpr.pb.pw25s.server.generic.IService;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class CategoryCRUDService extends IService<CategoryDTO> {
    @Override
    public List<CategoryDTO> getAll() {
        return null;
    }

    @Override
    public Optional<CategoryDTO> getById(Long id) {
        return Optional.empty();
    }

    @Override
    public CategoryDTO add(CategoryDTO model) {
        return null;
    }

    @Override
    public void delete(Long id) {

    }

    @Override
    public CategoryDTO update(CategoryDTO model, Long id) {
        return null;
    }
}
