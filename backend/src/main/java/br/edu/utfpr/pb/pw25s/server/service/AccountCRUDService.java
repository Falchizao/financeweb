package br.edu.utfpr.pb.pw25s.server.service;

import br.edu.utfpr.pb.pw25s.server.dto.AccountDTO;
import br.edu.utfpr.pb.pw25s.server.generic.IService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AccountCRUDService extends IService<AccountDTO> {
    @Override
    public List<AccountDTO> getAll() {
        return null;
    }

    @Override
    public Optional<AccountDTO> getById(Long id) {
        return Optional.empty();
    }

    @Override
    public AccountDTO add(AccountDTO model) {
        return null;
    }

    @Override
    public void delete(Long id) {

    }

    @Override
    public AccountDTO update(AccountDTO model, Long id) {
        return null;
    }
}
