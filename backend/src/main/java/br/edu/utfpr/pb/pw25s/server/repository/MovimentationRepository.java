package br.edu.utfpr.pb.pw25s.server.repository;

import br.edu.utfpr.pb.pw25s.server.generic.IRepository;
import br.edu.utfpr.pb.pw25s.server.model.Movimentation;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDate;
import java.util.List;

public interface MovimentationRepository extends IRepository<Movimentation> {

    @Query("SELECT obj FROM tb_movimentation obj WHERE obj.due_date BETWEEN :min AND :max")
    List<Movimentation> findPending(LocalDate min, LocalDate max);
}
