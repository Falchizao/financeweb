package br.edu.utfpr.pb.pw25s.server.repository;

import br.edu.utfpr.pb.pw25s.server.generic.IRepository;
import br.edu.utfpr.pb.pw25s.server.model.Account;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface AccountRepository extends IRepository<Account> {

    @Query("SELECT obj FROM tb_account obj WHERE obj.bank = :bank AND obj.bank_branch = :agency AND obj.code = :code")
    Account findByIdentificators(String bank, String agency, Long code);

    @Query("SELECT acc FROM tb_account acc where acc.user.username = :userName")
    List<Account> findByUsername(String userName);

}
