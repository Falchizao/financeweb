package br.edu.utfpr.pb.pw25s.server.generic;

import org.springframework.data.jpa.repository.JpaRepository;

public interface IRepository<T extends IModel> extends JpaRepository<T, Long> {
}