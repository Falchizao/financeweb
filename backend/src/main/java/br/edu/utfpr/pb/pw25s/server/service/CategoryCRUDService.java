package br.edu.utfpr.pb.pw25s.server.service;

import br.edu.utfpr.pb.pw25s.server.dto.CategoryDTO;
import br.edu.utfpr.pb.pw25s.server.generic.IService;
import br.edu.utfpr.pb.pw25s.server.handler.exceptions.ObjectInsertionConflictException;
import br.edu.utfpr.pb.pw25s.server.handler.modelException.ResourceNotFound;
import br.edu.utfpr.pb.pw25s.server.model.Category;
import br.edu.utfpr.pb.pw25s.server.repository.CategoryRepository;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Slf4j
public class CategoryCRUDService extends IService<CategoryDTO> {

    private final CategoryRepository categoryRepository;
    private final ModelMapper modelMapper;

    public CategoryCRUDService(CategoryRepository categoryRepository){
        this.categoryRepository = categoryRepository;
        this.modelMapper = new ModelMapper();

    }
    @Override
    public List<CategoryDTO> getAll(String username) {
        log.info("Fetching categories...");
        List<Category> categories = categoryRepository.findAll();

        return categories.stream()
                .map(category -> modelMapper.map(category, CategoryDTO.class))
                .collect(Collectors.toList());
    }

    @Override
    public Optional<CategoryDTO> getById(Long id) {
        log.info("Trying to find desired category...");
        Optional<Category> category = categoryRepository.findById(id);

        return Optional.of(modelMapper.map(category.get(), CategoryDTO.class));
    }

    @Override
    public CategoryDTO add(CategoryDTO model) {
        Category category;
        log.info("Adding new category...");

        try{
            category = categoryRepository.save(modelMapper.map(model, Category.class));
        }catch(Exception e){
            throw new ObjectInsertionConflictException("Category data is invalid!");
        }

        return modelMapper.map(category, CategoryDTO.class);
    }

    @Override
    public void delete(Long id) {
        Optional<Category> category = categoryRepository.findById(id);
        if(category.isEmpty()){
            throw new ResourceNotFound("Category by id Not found in service!");
        }

        log.info("Deleting category...");
        categoryRepository.deleteById(id);
    }

    @Override
    public CategoryDTO update(CategoryDTO model, Long id) {
        categoryRepository.deleteById(id);
        log.info("Updating category...");

        return modelMapper.map(categoryRepository.save(modelMapper.map(model, Category.class)), CategoryDTO.class);
    }

    public Category findByName(String string){
        return categoryRepository.findByname(string);
    }
}
