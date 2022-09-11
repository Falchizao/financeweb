package br.edu.utfpr.pb.pw25s.server.service;

import br.edu.utfpr.pb.pw25s.server.dto.AccountDTO;
import br.edu.utfpr.pb.pw25s.server.generic.IService;
import br.edu.utfpr.pb.pw25s.server.handler.modelException.ResourceNotFound;
import br.edu.utfpr.pb.pw25s.server.model.Account;
import br.edu.utfpr.pb.pw25s.server.repository.AccountRepository;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Slf4j
public class AccountCRUDService extends IService<AccountDTO> {

    private final AccountRepository accountRepository;
    private final ModelMapper modelMapper;

    public AccountCRUDService(AccountRepository accountRepository){
        this.accountRepository = accountRepository;
        this.modelMapper = new ModelMapper();

    }
    @Override
    public List<AccountDTO> getAll() {
        log.info("Fetching accounts...");
        List<Account> accounts = accountRepository.findAll();

        return accounts.stream()
                .map(account -> modelMapper.map(account, AccountDTO.class))
                .collect(Collectors.toList());
    }

    @Override
    public Optional<AccountDTO> getById(Long id) {
        log.info("Trying to find desired account...");
        Optional<Account> account = accountRepository.findById(id);

        return Optional.of(modelMapper.map(account.get(), AccountDTO.class));
    }

    @Override
    public AccountDTO add(AccountDTO model) {
        log.info("Adding new account...");
        Account account = accountRepository.save(modelMapper.map(model, Account.class));

        return modelMapper.map(account, AccountDTO.class);
    }

    @Override
    public void delete(Long id) {
        Optional<Account> account = accountRepository.findById(id);

        if(account.isEmpty()){
            throw new ResourceNotFound("Account by id Not found in service!");
        }
        log.info("Deleting account...");

        accountRepository.deleteById(id);
    }

    @Override
    public AccountDTO update(AccountDTO model, Long id) {
        accountRepository.deleteById(id);
        log.info("Updating account...");

        return modelMapper.map(accountRepository.save(modelMapper.map(model, Account.class)), AccountDTO.class);
    }
}
