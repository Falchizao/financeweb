package br.edu.utfpr.pb.pw25s.server.repository;

import br.edu.utfpr.pb.pw25s.server.generic.IRepository;
import br.edu.utfpr.pb.pw25s.server.model.Category;

public interface CategoryRepository extends IRepository<Category> {
    Category findByname(String name);
}
