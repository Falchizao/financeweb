package br.edu.utfpr.pb.pw25s.server.repository;

import br.edu.utfpr.pb.pw25s.server.generic.IRepository;
import br.edu.utfpr.pb.pw25s.server.model.Movimentation;
import org.springframework.data.jpa.repository.Query;
import java.time.LocalDate;
import java.util.List;

public interface MovimentationRepository extends IRepository<Movimentation> {

    @Query("SELECT obj FROM tb_movimentation obj INNER JOIN tb_account acc on obj.account.id = acc.id INNER JOIN tb_user us on acc.user.username = :username" +
            " AND (obj.due_date BETWEEN :min AND :max) AND obj.paymentDate IS NULL")
    List<Movimentation> findPending(LocalDate min, LocalDate max, String username);

    @Query("SELECT mv from tb_movimentation mv INNER JOIN tb_account acc on mv.account.id = acc.id INNER JOIN tb_user us on acc.user.id = us.id where us.username =:username")
    List<Movimentation> findByUser(String username);
}
